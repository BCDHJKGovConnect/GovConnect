import { fetchIdentityData } from "./identityConnectorService";
import { fetchPropertyData } from "./propertyConnectorService";
import { fetchRevenueData } from "./revenueConnectorService";

export const orchestrateVerification = async (
  identityMapping: {
    citizenId: string;
    identitySystemId: string;
    propertySystemId: string;
    revenueSystemId: string;
  }
) => {

  const identityData = await fetchIdentityData(
    identityMapping.identitySystemId
  );

  const propertyData = await fetchPropertyData(
    identityMapping.propertySystemId
  );

  const revenueData = await fetchRevenueData(
    identityMapping.revenueSystemId
  );

  return {
    citizenId: identityMapping.citizenId,

    identity: identityData,

    property: propertyData,

    revenue: revenueData
  };
};