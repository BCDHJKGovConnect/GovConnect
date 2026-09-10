export type Connector = {
  id: number;
  department: string;
  api_type: string;
  data_format: string;
  authentication: string;
  endpoint: string;
  enabled: boolean;
};

export const connectors: Connector[] = [
  {
    id: 1,
    department: "Transport Department",
    api_type: "REST",
    data_format: "JSON",
    authentication: "API_KEY",
    endpoint: "https://example.gov/api",
    enabled: true,
  },
];

let nextConnectorId = 2;

export function allocateConnectorId(): number {
  return nextConnectorId++;
}