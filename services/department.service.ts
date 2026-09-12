import axios from "axios";


// ========================================
// IDENTITY SERVICE
// ========================================
export async function callIdentityService(
    citizenId: number
) {
    const baseUrl =
        process.env.IDENTITY_SERVICE_URL;

    if (!baseUrl) {
        throw new Error(
            "IDENTITY_SERVICE_URL_NOT_CONFIGURED"
        );
    }

    const url =
        `${baseUrl}/identity/citizen/${citizenId}`;

    const response = await axios.get(
        url,
        {
            timeout: 5000
        }
    );

    return response.data;
}


// ========================================
// PROPERTY SERVICE
// ========================================
export async function callPropertyService(
    ownerRef: string
) {
    const baseUrl =
        process.env.PROPERTY_SERVICE_URL;

    if (!baseUrl) {
        throw new Error(
            "PROPERTY_SERVICE_URL_NOT_CONFIGURED"
        );
    }

    const url =
        `${baseUrl}/property/owner/${ownerRef}`;

    const response = await axios.get(
        url,
        {
            timeout: 5000
        }
    );

    return response.data;
}


// ========================================
// REVENUE SERVICE
// ========================================
export async function callRevenueService(
    taxpayerId: string
) {
    const baseUrl =
        process.env.REVENUE_SERVICE_URL;

    if (!baseUrl) {
        throw new Error(
            "REVENUE_SERVICE_URL_NOT_CONFIGURED"
        );
    }

    const url =
        `${baseUrl}/revenue/taxpayer/${taxpayerId}`;

    const response = await axios.get(
        url,
        {
            timeout: 5000
        }
    );

    return response.data;
}