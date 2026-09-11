import type {
  Application,
  AuditEvent,
  ConnectedSystem,
  Department,
  MonitoringService,
} from "../types";

export const connectedSystems: ConnectedSystem[] = [
  {
    name: "Identity",
    status: "ONLINE",
    endpoint: "/identity",
  },
  {
    name: "Property",
    status: "ONLINE",
    endpoint: "/property",
  },
  {
    name: "Revenue",
    status: "OFFLINE",
    endpoint: "/revenue",
  },
];

export const applications: Application[] = [
  {
    id: "BL-1001",
    citizenName: "Ananya",
    applicationType: "Business Licence",
    status: "Under Verification",
    propertyVerification: "Verified",
    taxVerification: "Pending",
  },
  {
    id: "BL-1002",
    citizenName: "Rahul",
    applicationType: "Business Licence",
    status: "Approved",
    propertyVerification: "Verified",
    taxVerification: "Verified",
  },
  {
    id: "BL-1003",
    citizenName: "Priya",
    applicationType: "Business Licence",
    status: "Pending",
    propertyVerification: "Pending",
    taxVerification: "Pending",
  },
];

export const departments: Department[] = [
  {
    name: "Identity Department",
    status: "Online",
    api: "REST",
    format: "JSON",
    version: "v1",
  },
  {
    name: "Property Department",
    status: "Online",
    api: "REST",
    format: "JSON",
    version: "v1",
  },
  {
    name: "Revenue Department",
    status: "Offline",
    api: "REST",
    format: "JSON",
    version: "v1",
  },
];

export const auditEvents: AuditEvent[] = [
  {
    time: "10:30",
    event: "Consent Granted",
    department: "Identity Department",
    result: "SUCCESS",
  },
  {
    time: "10:31",
    event: "Identity API Accessed",
    department: "Identity Department",
    result: "SUCCESS",
  },
  {
    time: "10:32",
    event: "Property Verified",
    department: "Property Department",
    result: "SUCCESS",
  },
  {
    time: "10:33",
    event: "Tax Verification Completed",
    department: "Revenue Department",
    result: "SUCCESS",
  },
];

export const monitoringServices: MonitoringService[] = [
  {
    name: "Identity Service",
    status: "ONLINE",
  },
  {
    name: "Property Service",
    status: "ONLINE",
  },
  {
    name: "Revenue Service",
    status: "OFFLINE",
  },
];