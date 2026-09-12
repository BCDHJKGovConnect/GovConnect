interface ConsentRecord {
  citizenId: string;
  purpose: string;
  consentGiven: boolean;
}

const consentRecords: ConsentRecord[] = [
  {
    citizenId: "CIT001",
    purpose: "BUSINESS_LICENSE_VERIFICATION",
    consentGiven: true
  },
  {
    citizenId: "CIT-1002",
    purpose: "BUSINESS_LICENSE_VERIFICATION",
    consentGiven: false
  }
];

export const checkConsent = (
  citizenId: string,
  purpose: string
): boolean => {

  const consent = consentRecords.find(
    (record) =>
      record.citizenId === citizenId &&
      record.purpose === purpose
  );

  return consent?.consentGiven === true;
};