import { resolveCitizenIdentity } from "./identityResolverService";
import { checkConsent } from "./consentService";
import { orchestrateVerification } from "./dataOrchestratorService";
import { publishEvent } from "./eventBusService";
import { createAuditLog } from "./auditService";
import {
  initializeApplication,
  updateApplicationStatus,
  markApplicationFailure
} from "./applicationTrackerService";
import { addToRecoveryQueue } from "./recoveryService";

export const verifyApplicationService = async (
  applicationId: string,
  citizenId: string,
  purpose: string
) => {

  // Step 1: Check citizen consent
  const consentGiven = checkConsent(citizenId, purpose);

  if (!consentGiven) {
    return {
      success: false,
      applicationId,
      citizenId,
      purpose,
      verificationStatus: "CONSENT_NOT_GIVEN",
      message: "Citizen consent is required for this verification"
    };
  }

  initializeApplication(
  applicationId,
  citizenId
);
  // Step 2: Resolve citizen identity
  const identityMapping = resolveCitizenIdentity(citizenId);

  if (!identityMapping) {
    return {
      success: false,
      applicationId,
      citizenId,
      verificationStatus: "IDENTITY_NOT_FOUND",
      message: "Citizen identity mapping not found"
    };
  }

  // Step 3: Orchestrate verification across departments
  let verificationData;

try {

  verificationData = await orchestrateVerification(
    identityMapping
  );

} catch (error) {

  updateApplicationStatus(
   applicationId,
   "identity",
   "VERIFIED"
  );

updateApplicationStatus(
   applicationId,
   "property",
   "VERIFIED"
  );
  
  updateApplicationStatus(
    applicationId,
    "revenue",
    "FAILED"
  );

  markApplicationFailure(
    applicationId,
    "revenue",
    "FAILED"
  );

  addToRecoveryQueue(
   applicationId,
   citizenId,
   purpose,
   "revenue"
  );

  createAuditLog(
    "VERIFICATION_FAILED",
    applicationId,
    citizenId,
    purpose,
    "FAILED"
  );

  throw error;
}

  updateApplicationStatus(
  applicationId,
  "identity",
  verificationData.identity.verificationStatus
);

updateApplicationStatus(
  applicationId,
  "property",
  verificationData.property.verificationStatus
);

updateApplicationStatus(
  applicationId,
  "revenue",
  verificationData.revenue.verificationStatus
);
  publishEvent(
  "VERIFICATION_COMPLETED",
  {
    applicationId,
    citizenId,
    purpose,
    verificationData
  }
);

createAuditLog(
  "VERIFICATION_COMPLETED",
  applicationId,
  citizenId,
  purpose,
  "SUCCESS"
);
  // Step 4: Return the complete verification result
  return {
    success: true,
    applicationId,
    citizenId,
    purpose,
    verificationStatus: "VERIFICATION_COMPLETED",
    verificationData,
    message: "Verification completed successfully"
  };
};