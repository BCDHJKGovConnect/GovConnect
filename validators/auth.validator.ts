import { z } from "zod";


// ========================================
// REGISTER VALIDATION
// ========================================
export const registerSchema = z.object({

    name: z
        .string()
        .min(
            2,
            "Name must contain at least 2 characters"
        )
        .max(
            100,
            "Name cannot exceed 100 characters"
        ),

    email: z
        .string()
        .email(
            "Please provide a valid email address"
        ),

    password: z
        .string()
        .min(
            8,
            "Password must contain at least 8 characters"
        )
        .max(
            100,
            "Password cannot exceed 100 characters"
        )
});


// ========================================
// LOGIN VALIDATION
// ========================================
export const loginSchema = z.object({

    email: z
        .string()
        .email(
            "Please provide a valid email address"
        ),

    password: z
        .string()
        .min(
            1,
            "Password is required"
        )
});