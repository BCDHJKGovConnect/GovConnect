import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/database";

// ========================================
// REGISTER USER
// ========================================
export async function registerUser(
    name: string,
    email: string,
    password: string
) {
    // Check whether email already exists
    const existingUser = await pool.query(
        "SELECT id FROM users WHERE email = $1",
        [email]
    );

    if (existingUser.rows.length > 0) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const result = await pool.query(
        `INSERT INTO users
        (name, email, password_hash, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, role, created_at`,
        [
            name,
            email,
            passwordHash,
            "CITIZEN"
        ]
    );

    return result.rows[0];
}


// ========================================
// LOGIN USER
// ========================================
export async function loginUser(
    email: string,
    password: string
) {
    // Find user
    const result = await pool.query(
        `SELECT
            id,
            name,
            email,
            password_hash,
            role
         FROM users
         WHERE email = $1`,
        [email]
    );

    // User not found
    if (result.rows.length === 0) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const user = result.rows[0];

    // Compare entered password with hashed password
    const passwordMatch = await bcrypt.compare(
        password,
        user.password_hash
    );

    // Password incorrect
    if (!passwordMatch) {
        throw new Error("INVALID_CREDENTIALS");
    }

    // Return user information
    // Never return password_hash
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };
}


// ========================================
// GENERATE JWT TOKEN
// ========================================
export function generateToken(user: {
    id: number;
    role: string;
}) {
    const secret = process.env.JWT_SECRET;

    // JWT secret must exist
    if (!secret) {
        throw new Error("JWT_SECRET_NOT_CONFIGURED");
    }

    // Create JWT token
    const token = jwt.sign(
        {
            userId: user.id,
            role: user.role
        },
        secret,
        {
            expiresIn: "1h"
        }
    );

    return token;
}