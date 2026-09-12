interface AuditRecord {
  timestamp: string;
  event: string;
  applicationId: string;
  citizenId: string;
  purpose: string;
  status: string;
}

const auditRecords: AuditRecord[] = [];

export const createAuditLog = (
  event: string,
  applicationId: string,
  citizenId: string,
  purpose: string,
  status: string
) => {

  const record: AuditRecord = {
    timestamp: new Date().toISOString(),
    event,
    applicationId,
    citizenId,
    purpose,
    status
  };

  auditRecords.push(record);

  console.log("AUDIT LOG CREATED");
  console.log(record);
};

export const getAuditLogs = () => {
  return auditRecords;
};