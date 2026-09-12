import { Request, Response } from "express";

import {
    registerUser,
    loginUser,
    generateToken
} from "../services/auth.service";

import {
    registerSchema,
    loginSchema
} from "../validators/auth.validator";

import {
    AuthenticatedRequest
} from "../middleware/auth.middleware";

import { pool } from "../config/database";


// ========================================
// REGISTER CONTROLLER
// ========================================
export async function register(
    req: Request,
    res: Response
) {
    try {

        const validation =
            registerSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validation.error.flatten()
            });
        }

        const {
            name,
            email,
            password
        } = validation.data;

        const user = await registerUser(
            name,
            email,
            password
        );

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user
            }
        });

    } catch (error) {

        if (
            error instanceof Error &&
            error.message === "EMAIL_ALREADY_EXISTS"
        ) {
            return res.status(409).json({
                success: false,
                message:
                    "An account with this email already exists"
            });
        }

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


// ========================================
// LOGIN CONTROLLER
// ========================================
export async function login(
    req: Request,
    res: Response
) {
    try {

        const validation =
            loginSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validation.error.flatten()
            });
        }

        const {
            email,
            password
        } = validation.data;

        const user = await loginUser(
            email,
            password
        );

        const token = generateToken({
            id: user.id,
            role: user.role
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user,
                token
            }
        });

    } catch (error) {

        if (
            error instanceof Error &&
            error.message === "INVALID_CREDENTIALS"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        if (
            error instanceof Error &&
            error.message === "JWT_SECRET_NOT_CONFIGURED"
        ) {
            return res.status(500).json({
                success: false,
                message:
                    "JWT secret is not configured"
            });
        }

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


// ========================================
// GET CURRENT USER
// ========================================
export async function getMe(
    req: AuthenticatedRequest,
    res: Response
) {
    try {

        // Authentication middleware should
        // already have added req.user
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const result = await pool.query(
            `SELECT
                id,
                name,
                email,
                role,
                created_at
             FROM users
             WHERE id = $1`,
            [req.user.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: {
                user: result.rows[0]
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