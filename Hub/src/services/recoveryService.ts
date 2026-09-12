interface RecoveryRequest {
  applicationId: string;
  citizenId: string;
  purpose: string;
  department: "identity" | "property" | "revenue";
}

const recoveryQueue: RecoveryRequest[] = [];

export const addToRecoveryQueue = (
  applicationId: string,
  citizenId: string,
  purpose: string,
  department: "identity" | "property" | "revenue"
) => {

  const existingRequest = recoveryQueue.find(
    (request) =>
      request.applicationId === applicationId &&
      request.department === department
  );

  if (existingRequest) {
    return;
  }

  recoveryQueue.push({
    applicationId,
    citizenId,
    purpose,
    department
  });

  console.log(
    `Recovery request added for ${department} department`
  );
};

export const getRecoveryQueue = () => {
  return recoveryQueue;
};

export const removeFromRecoveryQueue = (
  applicationId: string,
  department: "identity" | "property" | "revenue"
) => {

  const index = recoveryQueue.findIndex(
    (request) =>
      request.applicationId === applicationId &&
      request.department === department
  );

  if (index !== -1) {
    recoveryQueue.splice(index, 1);

    console.log(
      `Recovery request removed for ${department} department`
    );
  }
};