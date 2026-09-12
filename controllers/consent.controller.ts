import { Response } from "express";

import {
    AuthenticatedRequest
} from "../middleware/auth.middleware";

import {
    createConsent,
    grantConsent,
    revokeConsent,
    getCitizenConsents
} from "../services/consent.service";

import {
    createConsentSchema
} from "../validators/consent.validator";


// ========================================
// CREATE CONSENT
// ========================================
export async function createConsentController(
    req: AuthenticatedRequest,
    res: Response
) {
    try {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        if (req.user.role !== "CITIZEN") {
            return res.status(403).json({
                success: false,
                message: "Only citizens can manage consent"
            });
        }

        const validation =
            createConsentSchema.safeParse(
                req.body
            );

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validation.error.flatten()
            });
        }

        const consent =
            await createConsent(
                req.user.userId,
                validation.data.applicationId,
                validation.data.department,
                validation.data.purpose
            );

        return res.status(201).json({
            success: true,
            message: "Consent request created successfully",
            data: {
                consent
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


// ========================================
// GRANT CONSENT
// ========================================
export async function grantConsentController(
    req: AuthenticatedRequest,
    res: Response
) {
    try {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const consentId =
            Number(req.params.id);

        if (
            !Number.isInteger(consentId) ||
            consentId <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid consent ID"
            });
        }

        const consent =
            await grantConsent(
                consentId,
                req.user.userId
            );

        if (!consent) {
            return res.status(404).json({
                success: false,
                message: "Consent not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Consent granted successfully",
            data: {
                consent
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


// ========================================
// REVOKE CONSENT
// ========================================
export async function revokeConsentController(
    req: AuthenticatedRequest,
    res: Response
) {
    try {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const consentId =
            Number(req.params.id);

        if (
            !Number.isInteger(consentId) ||
            consentId <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid consent ID"
            });
        }

        const consent =
            await revokeConsent(
                consentId,
                req.user.userId
            );

        if (!consent) {
            return res.status(404).json({
                success: false,
                message: "Consent not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Consent revoked successfully",
            data: {
                consent
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


// ========================================
// GET MY CONSENTS
// ========================================
export async function getMyConsents(
    req: AuthenticatedRequest,
    res: Response
) {
    try {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const consents =
            await getCitizenConsents(
                req.user.userId
            );

        return res.status(200).json({
            success: true,
            message: "Consents retrieved successfully",
            data: {
                consents
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}