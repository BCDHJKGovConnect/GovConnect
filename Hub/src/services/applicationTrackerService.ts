interface ApplicationStatus {
  applicationId: string;
  citizenId: string;
  overallStatus: string;
  identityStatus: string;
  propertyStatus: string;
  revenueStatus: string;
  lastUpdated: string;
}

const applications: ApplicationStatus[] = [];

export const initializeApplication = (
  applicationId: string,
  citizenId: string
) => {

  const existingApplication = applications.find(
    (application) => application.applicationId === applicationId
  );

  if (existingApplication) {
    return existingApplication;
  }

  const application: ApplicationStatus = {
    applicationId,
    citizenId,
    overallStatus: "IN_PROGRESS",
    identityStatus: "PENDING",
    propertyStatus: "PENDING",
    revenueStatus: "PENDING",
    lastUpdated: new Date().toISOString()
  };

  applications.push(application);

  return application;
};

export const updateApplicationStatus = (
  applicationId: string,
  department: "identity" | "property" | "revenue",
  status: string
) => {

  const application = applications.find(
    (application) =>
      application.applicationId === applicationId
  );

  if (!application) {
    return null;
  }

  if (department === "identity") {
    application.identityStatus = status;
  }

  if (department === "property") {
    application.propertyStatus = status;
  }

  if (department === "revenue") {
    application.revenueStatus = status;
  }

  if (
    application.identityStatus === "VERIFIED" &&
    application.propertyStatus === "VERIFIED" &&
    application.revenueStatus === "VERIFIED"
  ) {
    application.overallStatus = "COMPLETED";
  }

  application.lastUpdated = new Date().toISOString();

  return application;
};

export const getApplicationStatus = (
  applicationId: string
) => {

  return applications.find(
    (application) =>
      application.applicationId === applicationId
  ) || null;
};

export const markApplicationFailure = (
  applicationId: string,
  department: "identity" | "property" | "revenue",
  status: string
) => {

  const application = applications.find(
    (application) =>
      application.applicationId === applicationId
  );

  if (!application) {
    return null;
  }

  if (department === "identity") {
    application.identityStatus = status;
  }

  if (department === "property") {
    application.propertyStatus = status;
  }

  if (department === "revenue") {
    application.revenueStatus = status;
  }

  application.overallStatus = "ACTION_REQUIRED";

  application.lastUpdated = new Date().toISOString();

  return application;
};