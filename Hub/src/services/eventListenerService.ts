import {
  subscribeToEvent
} from "./eventBusService";

export const initializeEventListeners = () => {

  subscribeToEvent(
    "VERIFICATION_COMPLETED",
    (data) => {

      console.log(
        "Event received: VERIFICATION_COMPLETED"
      );

      console.log(
        "Application:",
        data.applicationId
      );

      console.log(
        "Citizen:",
        data.citizenId
      );

      console.log(
        "Verification completed successfully"
      );
    }
  );

};