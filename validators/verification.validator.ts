import { z } from "zod";


// ========================================
// VERIFICATION REQUEST VALIDATION
// ========================================
export const verificationRequestSchema =
    z.object({

        applicationId: z
            .number()
            .int()
            .positive(),

        citizenId: z
            .number()
            .int()
            .positive(),

        purpose: z
            .string()
            .min(2)
            .max(255),

        consentId: z
            .number()
            .int()
            .positive(),

        requestedData: z
            .array(
                z.enum([
                    "IDENTITY",
                    "PROPERTY",
                    "REVENUE"
                ])
            )
            .min(1)
    });