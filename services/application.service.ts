import { pool } from "../config/database";


// ========================================
// CREATE APPLICATION
// ========================================
export async function createApplication(
    userId: number,
    applicationType: string
) {

    // Find the citizen belonging to this user
    const citizenResult = await pool.query(
        `
        SELECT id, citizen_id
        FROM citizens
        WHERE user_id = $1
        `,
        [userId]
    );

    if (citizenResult.rows.length === 0) {
        throw new Error("CITIZEN_NOT_FOUND");
    }

    const citizen = citizenResult.rows[0];


    // Generate application number
    const applicationNumber =
        `BL-${Date.now()}`;


    // Create application
    const result = await pool.query(
        `
        INSERT INTO applications
        (
            citizen_id,
            application_number,
            application_type,
            status
        )
        VALUES ($1, $2, $3, $4)
        RETURNING
            id,
            citizen_id,
            application_number,
            application_type,
            status,
            created_at,
            updated_at
        `,
        [
            citizen.id,
            applicationNumber,
            applicationType,
            "DRAFT"
        ]
    );


    return result.rows[0];
}


// ========================================
// GET APPLICATION BY ID
// ========================================
export async function getApplicationById(
    applicationId: number,
    userId: number,
    role: string
) {

    let result;


    // ------------------------------------
    // ADMIN / DEPARTMENT
    // ------------------------------------
    if (
        role === "ADMIN" ||
        role === "DEPARTMENT"
    ) {

        result = await pool.query(
            `
            SELECT
                a.id,
                a.citizen_id,
                a.application_number,
                a.application_type,
                a.status,
                a.created_at,
                a.updated_at,

                c.citizen_id AS citizen_reference,
                c.phone,
                c.address

            FROM applications a

            INNER JOIN citizens c
                ON a.citizen_id = c.id

            WHERE a.id = $1
            `,
            [applicationId]
        );

    }

    // ------------------------------------
    // CITIZEN
    // ------------------------------------
    else {

        result = await pool.query(
            `
            SELECT
                a.id,
                a.citizen_id,
                a.application_number,
                a.application_type,
                a.status,
                a.created_at,
                a.updated_at,

                c.citizen_id AS citizen_reference,
                c.phone,
                c.address

            FROM applications a

            INNER JOIN citizens c
                ON a.citizen_id = c.id

            WHERE
                a.id = $1
                AND c.user_id = $2
            `,
            [
                applicationId,
                userId
            ]
        );
    }


    if (result.rows.length === 0) {
        throw new Error("APPLICATION_NOT_FOUND");
    }


    return result.rows[0];
}


// ========================================
// GET CITIZEN APPLICATIONS
// ========================================
export async function getCitizenApplications(
    userId: number
) {

    const result = await pool.query(
        `
        SELECT
            a.id,
            a.application_number,
            a.application_type,
            a.status,
            a.created_at,
            a.updated_at

        FROM applications a

        INNER JOIN citizens c
            ON a.citizen_id = c.id

        WHERE c.user_id = $1

        ORDER BY a.created_at DESC
        `,
        [userId]
    );


    return result.rows;
}


// ========================================
// UPDATE APPLICATION STATUS
// ========================================
export async function updateApplicationStatus(
    applicationId: number,
    status: string
) {

    const allowedStatuses = [
        "DRAFT",
        "SUBMITTED",
        "UNDER_VERIFICATION",
        "APPROVED",
        "REJECTED"
    ];


    if (!allowedStatuses.includes(status)) {
        throw new Error("INVALID_STATUS");
    }


    const result = await pool.query(
        `
        UPDATE applications

        SET
            status = $1,
            updated_at = CURRENT_TIMESTAMP

        WHERE id = $2

        RETURNING
            id,
            citizen_id,
            application_number,
            application_type,
            status,
            created_at,
            updated_at
        `,
        [
            status,
            applicationId
        ]
    );


    if (result.rows.length === 0) {
        throw new Error("APPLICATION_NOT_FOUND");
    }


    return result.rows[0];
}