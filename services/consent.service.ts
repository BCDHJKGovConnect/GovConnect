import { pool } from "../config/database";


// ========================================
// CREATE CONSENT
// ========================================
export async function createConsent(
    userId: number,
    applicationId: number,
    department: string,
    purpose: string
) {
    // ----------------------------------------
    // Find citizen record using logged-in user
    // ----------------------------------------
    const citizenResult = await pool.query(
        `SELECT id
         FROM citizens
         WHERE user_id = $1`,
        [userId]
    );

    if (citizenResult.rows.length === 0) {
        throw new Error("Citizen record not found");
    }

    const citizenId = citizenResult.rows[0].id;


    // ----------------------------------------
    // Verify application belongs to citizen
    // ----------------------------------------
    const applicationResult = await pool.query(
        `SELECT id
         FROM applications
         WHERE id = $1
           AND citizen_id = $2`,
        [
            applicationId,
            citizenId
        ]
    );

    if (applicationResult.rows.length === 0) {
        throw new Error(
            "Application not found for this citizen"
        );
    }


    // ----------------------------------------
    // Find department using department name
    // ----------------------------------------
    const departmentResult = await pool.query(
        `SELECT id
         FROM departments
         WHERE LOWER(name) = LOWER($1)
            OR LOWER(department_code) = LOWER($1)
         LIMIT 1`,
        [department]
    );

    if (departmentResult.rows.length === 0) {
        throw new Error("Department not found");
    }

    const departmentId =
        departmentResult.rows[0].id;


    // ----------------------------------------
    // Create consent
    // ----------------------------------------
    const result = await pool.query(
        `INSERT INTO consents
        (
            citizen_id,
            department_id,
            purpose,
            status,
            data_requested
        )
        VALUES
        (
            $1,
            $2,
            $3,
            'PENDING',
            $4
        )
        RETURNING *`,
        [
            citizenId,
            departmentId,
            purpose,
            purpose
        ]
    );

    return result.rows[0];
}


// ========================================
// GRANT CONSENT
// ========================================
export async function grantConsent(
    consentId: number,
    userId: number
) {
    // Find citizen belonging to logged-in user
    const citizenResult = await pool.query(
        `SELECT id
         FROM citizens
         WHERE user_id = $1`,
        [userId]
    );

    if (citizenResult.rows.length === 0) {
        throw new Error("Citizen record not found");
    }

    const citizenId = citizenResult.rows[0].id;


    const result = await pool.query(
        `UPDATE consents
         SET
            status = 'GRANTED',
            granted_at = CURRENT_TIMESTAMP
         WHERE
            id = $1
            AND citizen_id = $2
         RETURNING *`,
        [
            consentId,
            citizenId
        ]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}


// ========================================
// REVOKE CONSENT
// ========================================
export async function revokeConsent(
    consentId: number,
    userId: number
) {
    // Find citizen belonging to logged-in user
    const citizenResult = await pool.query(
        `SELECT id
         FROM citizens
         WHERE user_id = $1`,
        [userId]
    );

    if (citizenResult.rows.length === 0) {
        throw new Error("Citizen record not found");
    }

    const citizenId = citizenResult.rows[0].id;


    const result = await pool.query(
        `UPDATE consents
         SET
            status = 'REVOKED'
         WHERE
            id = $1
            AND citizen_id = $2
         RETURNING *`,
        [
            consentId,
            citizenId
        ]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}


// ========================================
// GET MY CONSENTS
// ========================================
export async function getCitizenConsents(
    userId: number
) {
    const result = await pool.query(
        `SELECT
            c.id,
            c.citizen_id,
            c.department_id,
            d.name AS department,
            d.department_code,
            c.purpose,
            c.status,
            c.granted_at,
            c.data_requested,
            c.expires_at
         FROM consents c
         LEFT JOIN departments d
            ON c.department_id = d.id
         INNER JOIN citizens ci
            ON c.citizen_id = ci.id
         WHERE ci.user_id = $1
         ORDER BY c.id DESC`,
        [userId]
    );

    return result.rows;
}


// ========================================
// CHECK GRANTED CONSENT
// ========================================
export async function checkGrantedConsent(
    userId: number,
    applicationId: number,
    department: string
) {
    // Find citizen
    const citizenResult = await pool.query(
        `SELECT id
         FROM citizens
         WHERE user_id = $1`,
        [userId]
    );

    if (citizenResult.rows.length === 0) {
        return null;
    }

    const citizenId = citizenResult.rows[0].id;


    // Verify application belongs to citizen
    const applicationResult = await pool.query(
        `SELECT id
         FROM applications
         WHERE id = $1
           AND citizen_id = $2`,
        [
            applicationId,
            citizenId
        ]
    );

    if (applicationResult.rows.length === 0) {
        return null;
    }


    // Find department
    const departmentResult = await pool.query(
        `SELECT id
         FROM departments
         WHERE LOWER(name) = LOWER($1)
            OR LOWER(department_code) = LOWER($1)
         LIMIT 1`,
        [department]
    );

    if (departmentResult.rows.length === 0) {
        return null;
    }

    const departmentId =
        departmentResult.rows[0].id;


    // Check granted consent
    const result = await pool.query(
        `SELECT *
         FROM consents
         WHERE
            citizen_id = $1
            AND department_id = $2
            AND status = 'GRANTED'
         ORDER BY granted_at DESC
         LIMIT 1`,
        [
            citizenId,
            departmentId
        ]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}