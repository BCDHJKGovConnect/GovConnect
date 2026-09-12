import { pool } from "../config/database";


// ========================================
// SAVE VERIFICATION RESULT
// ========================================
export async function saveVerificationResult(
    applicationId: number,
    department: string,
    referenceId: string | null,
    status: string,
    responseData: unknown
) {
    const result = await pool.query(
        `INSERT INTO verification_results
        (
            application_id,
            department,
            reference_id,
            status,
            response_data
        )
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING *`,
        [
            applicationId,
            department,
            referenceId,
            status,
            responseData
        ]
    );

    return result.rows[0];
}


// ========================================
// GET VERIFICATION RESULTS
// ========================================
export async function getVerificationResults(
    applicationId: number
) {
    const result = await pool.query(
        `SELECT *
         FROM verification_results
         WHERE application_id = $1
         ORDER BY verified_at DESC`,
        [applicationId]
    );

    return result.rows;
}