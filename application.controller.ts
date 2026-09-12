import { Response } from "express";

import {
    AuthenticatedRequest
} from "../middleware/auth.middleware";

import {
    createApplication,
    getApplicationById,
    getCitizenApplications,
    updateApplicationStatus
} from "../services/application.service";

import {
    validateCreateApplication,
    validateApplicationStatus
} from "../validators/application.validator";

import {
    createAuditLog
} from "../services/audit.service";

import { pool } from "../config/database";

import {
    requestApplicationVerificationFromHub
} from "../services/hub.service";


// ========================================
// CREATE APPLICATION
// ========================================
export async function createApplicationController(
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

        const validation =
            validateCreateApplication(req.body);

        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                message: validation.message
            });
        }

        const application =
            await createApplication(
                req.user.userId,
                req.body.applicationType
            );

        await createAuditLog(
            req.user.userId,
            "CREATE_APPLICATION",
            "application",
            "SUCCESS",
            application.id,
            null
        );

        return res.status(201).json({
            success: true,
            message: "Application created successfully",
            data: application
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to create application"
        });
    }
}


// ========================================
// GET APPLICATION BY ID
// ========================================
export async function getApplicationController(
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

        const applicationId =
            Number(req.params.id);

        if (
            !Number.isInteger(applicationId) ||
            applicationId <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid application ID"
            });
        }

        const application =
            await getApplicationById(
                applicationId,
                req.user.userId,
                req.user.role
            );

        return res.status(200).json({
            success: true,
            data: application
        });

    } catch (error) {

        console.error(error);

        if (
            error instanceof Error &&
            error.message === "APPLICATION_NOT_FOUND"
        ) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to fetch application"
        });
    }
}


// ========================================
// GET MY APPLICATIONS
// ========================================
export async function getMyApplicationsController(
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

        const applications =
            await getCitizenApplications(
                req.user.userId
            );

        return res.status(200).json({
            success: true,
            data: applications
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch applications"
        });
    }
}


// ========================================
// UPDATE APPLICATION STATUS
// ========================================
export async function updateApplicationStatusController(
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

        const applicationId =
            Number(req.params.id);

        if (
            !Number.isInteger(applicationId) ||
            applicationId <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid application ID"
            });
        }

        const validation =
            validateApplicationStatus(req.body);

        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                message: validation.message
            });
        }

        const application =
            await updateApplicationStatus(
                applicationId,
                req.body.status
            );

        await createAuditLog(
            req.user.userId,
            "UPDATE_APPLICATION_STATUS",
            "application",
            "SUCCESS",
            applicationId,
            null
        );

        return res.status(200).json({
            success: true,
            message: "Application status updated successfully",
            data: application
        });

    } catch (error) {

        console.error(error);

        if (
            error instanceof Error &&
            error.message === "INVALID_STATUS"
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid application status"
            });
        }

        if (
            error instanceof Error &&
            error.message === "APPLICATION_NOT_FOUND"
        ) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to update application status"
        });
    }
}


// ========================================
// REQUEST APPLICATION VERIFICATION
// ========================================
export async function requestApplicationVerification(
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

        const applicationId =
            Number(req.params.applicationId);

        const citizenId =
            Number(req.body.citizenId);

        const { purpose } = req.body;


        // ----------------------------------------
        // Validate application ID
        // ----------------------------------------
        if (
            !Number.isInteger(applicationId) ||
            applicationId <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid applicationId"
            });
        }


        // ----------------------------------------
        // Validate citizen ID
        // ----------------------------------------
        if (
            !Number.isInteger(citizenId) ||
            citizenId <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid citizenId"
            });
        }


        // ----------------------------------------
        // Validate purpose
        // ----------------------------------------
        if (
            typeof purpose !== "string" ||
            purpose.trim().length < 2
        ) {
            return res.status(400).json({
                success: false,
                message: "Purpose is required"
            });
        }


        // ----------------------------------------
        // Get application
        // IMPORTANT:
        // getApplicationById requires
        // applicationId + userId + role
        // ----------------------------------------
        const application =
            await getApplicationById(
                applicationId,
                req.user.userId,
                req.user.role
            );


        // ----------------------------------------
        // Check citizen ownership
        // ----------------------------------------
        if (
            Number(application.citizen_id) !==
            citizenId
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "Citizen does not belong to this application"
            });
        }


        // ----------------------------------------
        // Extra citizen ownership verification
        // ----------------------------------------
        if (req.user.role === "CITIZEN") {

            const citizenResult =
                await pool.query(
                    `
                    SELECT id
                    FROM citizens
                    WHERE id = $1
                    AND user_id = $2
                    `,
                    [
                        citizenId,
                        req.user.userId
                    ]
                );

            if (citizenResult.rows.length === 0) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied"
                });
            }
        }


        // ----------------------------------------
        // Call Interoperability Hub
        // ----------------------------------------
        const hubResponse =
            await requestApplicationVerificationFromHub({
                applicationId,
                citizenId,
                purpose: purpose.trim()
            });


        // ----------------------------------------
        // Audit log
        // ----------------------------------------
        await createAuditLog(
            req.user.userId,
            "REQUEST_VERIFICATION",
            "application",
            "SUCCESS",
            applicationId,
            null
        );


        // ----------------------------------------
        // Final response
        // ----------------------------------------
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


        if (
            error instanceof Error &&
            error.message === "APPLICATION_NOT_FOUND"
        ) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }


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


        if (
            error instanceof Error &&
            error.message === "Citizen not found"
        ) {
            return res.status(404).json({
                success: false,
                message: "Citizen not found"
            });
        }


        return res.status(502).json({
            success: false,
            message:
                "Interoperability Hub is unavailable"
        });
    }
}