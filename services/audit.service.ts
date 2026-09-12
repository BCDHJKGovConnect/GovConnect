import { pool } from "../config/database";

export async function createAuditLog(
    userId: number | null,
    action: string,
    resource: string,
    status: string,
    applicationId: number | null = null,
    departmentId: number | null = null
) {
    await pool.query(
        `INSERT INTO audit_logs
        (
            user_id,
            department_id,
            application_id,
            action,
            resource,
            status
        )
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [
            userId,
            departmentId,
            applicationId,
            action,
            resource,
            status
        ]
    );
}