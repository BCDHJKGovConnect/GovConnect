import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


// ========================================
// AUTHENTICATED REQUEST TYPE
// ========================================
export interface AuthenticatedRequest extends Request {
    user?: {
        userId: number;
        role: string;
    };
}


// ========================================
// AUTHENTICATION MIDDLEWARE
// ========================================
export function authenticate(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    try {

        // Get Authorization header
        const authorization =
            req.headers.authorization;

        // No Authorization header
        if (!authorization) {
            return res.status(401).json({
                success: false,
                message: "Authorization token required"
            });
        }


        // Expected format:
        // Bearer TOKEN
        const [scheme, token] =
            authorization.split(" ");


        // Check format
        if (
            scheme !== "Bearer" ||
            !token
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format"
            });
        }


        // Get JWT secret
        const secret =
            process.env.JWT_SECRET;

        if (!secret) {
            return res.status(500).json({
                success: false,
                message: "JWT secret not configured"
            });
        }


        // Verify token
        const decoded =
            jwt.verify(token, secret) as {
                userId: number;
                role: string;
            };


        // Store decoded user information
        req.user = decoded;


        // Continue to protected route
        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}