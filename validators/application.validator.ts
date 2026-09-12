import { z } from "zod";


// ========================================
// CREATE APPLICATION VALIDATION
// ========================================
export const createApplicationSchema =
    z.object({

        applicationType: z
            .string()
            .min(
                2,
                "Application type is required"
            )
            .max(
                100,
                "Application type cannot exceed 100 characters"
            )
    });


// ========================================
// UPDATE STATUS VALIDATION
// ========================================
export const updateApplicationStatusSchema =
    z.object({

        status: z.enum([
            "DRAFT",
            "SUBMITTED",
            "UNDER_VERIFICATION",
            "APPROVED",
            "REJECTED"
        ])
    });