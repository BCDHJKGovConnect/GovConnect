interface IdentityMapping {
  citizenId: string;
  identitySystemId: string;
  propertySystemId: string;
  revenueSystemId: string;
}

const identityMappings: IdentityMapping[] = [
  {
    citizenId: "CIT001",
    identitySystemId: "101",
    propertySystemId: "P458",
    revenueSystemId: "T782"
  },
  {
    citizenId: "CIT-1002",
    identitySystemId: "102",
    propertySystemId: "P459",
    revenueSystemId: "T783"
  }
];

export const resolveCitizenIdentity = (
  citizenId: string
): IdentityMapping | null => {

  const mapping = identityMappings.find(
    (mapping) => mapping.citizenId === citizenId
  );

  return mapping || null;
};