import { Response, NextFunction } from "express";

import {
    AuthenticatedRequest
} from "./auth.middleware";


// ========================================
// ROLE AUTHORIZATION MIDDLEWARE
// ========================================
export function requireRole(
    ...allowedRoles: string[]
) {

    return (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) => {

        // User must be authenticated
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }


        // Check user's role
        if (
            !allowedRoles.includes(
                req.user.role
            )
        ) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }


        // Role is allowed
        next();
    };
}