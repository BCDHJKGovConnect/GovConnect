import { Response } from "express";

import {
    AuthenticatedRequest
} from "../middleware/auth.middleware";

import {
    verificationRequestSchema
} from "../validators/verification.validator";

import {
    getApplicationById
} from "../services/application.service";

import {
    checkGrantedConsent
} from "../services/consent.service";

import {
    requestVerificationFromHub
} from "../services/hub.service";


// ========================================
// REQUEST VERIFICATION
// POST /api/verification/request
// ========================================
export async function requestVerification(
    req: AuthenticatedRequest,
    res: Response
) {
    try {

        // ========================================
        // CHECK AUTHENTICATION
        // ========================================
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }


        // ========================================
        // VALIDATE REQUEST BODY
        // ========================================
        const validation =
            verificationRequestSchema.safeParse(
                req.body
            );

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validation.error.flatten()
            });
        }


        const {
            applicationId,
            citizenId,
            purpose,
            consentId,
            requestedData
        } = validation.data;


        // ========================================
        // CHECK APPLICATION
        // ========================================
        const application =
            await getApplicationById(
                applicationId
            );

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }


        // ========================================
        // CHECK CITIZEN ACCESS
        // ========================================
        if (
            req.user.role === "CITIZEN" &&
            application.citizen_id !== req.user.userId
        ) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }


        // ========================================
        // CHECK GRANTED CONSENT
        // ========================================
        for (const department of requestedData) {

            const consent =
                await checkGrantedConsent(
                    req.user.userId,
                    applicationId,
                    department
                );

            if (!consent) {
                return res.status(403).json({
                    success: false,
                    message:
                        `Granted consent required for ${department}`
                });
            }
        }


        // ========================================
        // SEND REQUEST TO INTEROPERABILITY HUB
        // ========================================
        const hubResponse =
            await requestVerificationFromHub({
                applicationId,
                citizenId,
                purpose,
                consentId,
                requestedData
            });


        // ========================================
        // SUCCESS RESPONSE
        // ========================================
        return res.status(200).json({
            success: true,
            message:
                "Verification request sent to interoperability hub",
            data: {
                hubResponse
            }
        });

    } catch (error) {

        console.error(error);


        // ========================================
        // HUB URL NOT CONFIGURED
        // ========================================
        if (
            error instanceof Error &&
            error.message ===
            "INTEROPERABILITY_HUB_URL_NOT_CONFIGURED"
        ) {
            return res.status(500).json({
                success: false,
                message:
                    "Interoperability Hub URL is not configured"
            });
        }


        // ========================================
        // HUB UNAVAILABLE
        // ========================================
        return res.status(502).json({
            success: false,
            message:
                "Interoperability Hub is unavailable"
        });
    }
}