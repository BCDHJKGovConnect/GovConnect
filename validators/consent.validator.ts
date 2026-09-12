import { z } from "zod";


// ========================================
// CREATE CONSENT VALIDATION
// ========================================
export const createConsentSchema =
    z.object({

        applicationId: z
            .number()
            .int()
            .positive(),

        department: z
            .string()
            .min(2)
            .max(50),

        purpose: z
            .string()
            .min(2)
            .max(255)
    });