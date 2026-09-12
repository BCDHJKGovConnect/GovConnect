import { retryRequest } from "./retryService";

export const fetchPropertyData = async (
  propertySystemId: string
) => {

  const result = await retryRequest(async () => {

    const response = await fetch(
      `http://localhost:7102/api/property/properties/${propertySystemId}`
    );

    if (!response.ok) {
      throw new Error(
        `Property Department returned status ${response.status}`
      );
    }

    return await response.json();
  });

  return {
    systemId: result.data.propertyId,
    propertyType: result.data.propertyType,
    propertyAddress: result.data.propertyAddress,
    ownershipStatus: result.data.ownershipStatus,
    verificationStatus: result.data.verificationStatus
  };
};