import { retryRequest } from "./retryService";

export const fetchIdentityData = async (
  identitySystemId: string
) => {

  const result = await retryRequest(async () => {

    const response = await fetch(
      `http://localhost:7101/api/identity/citizens/${identitySystemId}`
    );

    if (!response.ok) {
      throw new Error(
        `Identity Department returned status ${response.status}`
      );
    }

    return await response.json();
  });

  return {
    systemId: result.data.identityId,
    name: result.data.fullName,
    dateOfBirth: result.data.dob,
    address: result.data.addressLine,
    verificationStatus: result.data.verification
  };
};