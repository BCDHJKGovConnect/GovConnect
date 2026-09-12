import axios from "axios";
import { pool } from "../config/database";

export async function requestVerificationFromHub(
    requestData: {
        applicationId: number;
        citizenId: number;
        purpose: string;
        consentId: number;
        requestedData: string[];
    }
) {
    const baseUrl = process.env.INTEROPERABILITY_HUB_URL;

    if (!baseUrl) {
        throw new Error("INTEROPERABILITY_HUB_URL_NOT_CONFIGURED");
    }

    const applicationResult = await pool.query(
        `SELECT application_number
         FROM applications
         WHERE id = $1`,
        [requestData.applicationId]
    );

    if (applicationResult.rows.length === 0) {
        throw new Error("Application not found");
    }

    const applicationNumber =
        applicationResult.rows[0].application_number;

    const citizenResult = await pool.query(
        `SELECT citizen_id
         FROM citizens
         WHERE id = $1`,
        [requestData.citizenId]
    );

    if (citizenResult.rows.length === 0) {
        throw new Error("Citizen not found");
    }

    const citizenSystemId =
        citizenResult.rows[0].citizen_id;

    const response = await axios.post(
        `${baseUrl}/api/interoperability/verify`,
        {
            applicationId: applicationNumber,
            citizenId: citizenSystemId,
            purpose: requestData.purpose
        },
        {
            timeout: 10000,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    return response.data;
}


export async function requestApplicationVerificationFromHub(
    requestData: {
        applicationId: number;
        citizenId: number;
        purpose: string;
    }
) {
    const baseUrl = process.env.INTEROPERABILITY_HUB_URL;

    if (!baseUrl) {
        throw new Error("INTEROPERABILITY_HUB_URL_NOT_CONFIGURED");
    }

    const applicationResult = await pool.query(
        `SELECT application_number
         FROM applications
         WHERE id = $1`,
        [requestData.applicationId]
    );

    if (applicationResult.rows.length === 0) {
        throw new Error("Application not found");
    }

    const applicationNumber =
        applicationResult.rows[0].application_number;

    const citizenResult = await pool.query(
        `SELECT citizen_id
         FROM citizens
         WHERE id = $1`,
        [requestData.citizenId]
    );

    if (citizenResult.rows.length === 0) {
        throw new Error("Citizen not found");
    }

    const citizenSystemId =
        citizenResult.rows[0].citizen_id;

    const response = await axios.post(
        `${baseUrl}/api/interoperability/verify`,
        {
            applicationId: applicationNumber,
            citizenId: citizenSystemId,
            purpose: requestData.purpose
        },
        {
            timeout: 10000,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    return response.data;
}