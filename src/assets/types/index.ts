export type ServiceStatus = "ONLINE" | "OFFLINE" | "WARNING";

export interface ConnectedSystem {
  name: string;
  status: ServiceStatus;
  endpoint: string;
}

export interface Application {
  id: string;
  citizenName: string;
  applicationType: string;
  status: string;
  propertyVerification: string;
  taxVerification: string;
}

export interface Department {
  name: string;
  status: string;
  api: string;
  format: string;
  version: string;
}

export interface AuditEvent {
  time: string;
  event: string;
  department: string;
  result: string;
}

export interface MonitoringService {
  name: string;
  status: ServiceStatus;
}