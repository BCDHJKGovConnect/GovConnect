import {
  getRecoveryQueue,
  removeFromRecoveryQueue
} from "./recoveryService";

import { fetchRevenueData } from "./revenueConnectorService";

import {
  updateApplicationStatus
} from "./applicationTrackerService";

import {
  createAuditLog
} from "./auditService";

import {
  resolveCitizenIdentity
} from "./identityResolverService";


export const processRecoveryQueue = async () => {

  const queue = getRecoveryQueue();

  if (queue.length === 0) {
    return;
  }

  console.log(
    `Processing ${queue.length} recovery request(s)...`
  );

  for (const request of [...queue]) {

    if (request.department !== "revenue") {
      continue;
    }

    try {

      console.log(
        `Retrying Revenue verification for application ${request.applicationId}`
      );

      // Resolve the citizen's department IDs
      const identityMapping = resolveCitizenIdentity(
        request.citizenId
      );

      if (!identityMapping) {
        throw new Error(
          "Citizen identity mapping not found during recovery"
        );
      }

      // Get the correct Revenue system ID dynamically
      const revenueData = await fetchRevenueData(
        identityMapping.revenueSystemId
      );

      // Update the application tracker
      updateApplicationStatus(
        request.applicationId,
        "revenue",
        revenueData.verificationStatus
      );

      // Remove the successfully recovered request
      removeFromRecoveryQueue(
        request.applicationId,
        request.department
      );

      // Create audit record
      createAuditLog(
        "RECOVERY_COMPLETED",
        request.applicationId,
        request.citizenId,
        request.purpose,
        "SUCCESS"
      );

      console.log(
        `Recovery completed for application ${request.applicationId}`
      );

    } catch (error) {

      console.log(
        `Recovery attempt failed for application ${request.applicationId}`
      );

    }
  }
};