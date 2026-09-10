import type { RequestHandler } from "express";
import { connectors, allocateConnectorId, type Connector } from "./data/connectors";
import { HttpError, invalidIdentifier } from "../../shared/errors";
import {
  isHttpUrl,
  isNonEmptyString,
  isPlainObject,
  isPositiveInteger,
  singleParam,
} from "../../shared/validation";

const connectorFields = [
  "department",
  "api_type",
  "data_format",
  "authentication",
  "endpoint",
  "enabled",
] as const;

type ConnectorInput = Omit<Connector, "id">;

function readConnectorInput(body: unknown, partial = false): Partial<ConnectorInput> | ConnectorInput {
  if (!isPlainObject(body)) {
    throw new HttpError(400, "Request body must be a JSON object");
  }

  const unknownFields = Object.keys(body).filter(
    (field) => field !== "id" && !connectorFields.includes(field as (typeof connectorFields)[number]),
  );
  if (unknownFields.length > 0) {
    throw new HttpError(400, "Request contains unsupported connector fields", { fields: unknownFields });
  }

  const input: Partial<ConnectorInput> = {};
  if ("department" in body && isNonEmptyString(body.department)) input.department = body.department.trim();
  if ("api_type" in body && isNonEmptyString(body.api_type)) input.api_type = body.api_type.trim().toUpperCase();
  if ("data_format" in body && isNonEmptyString(body.data_format)) input.data_format = body.data_format.trim().toUpperCase();
  if ("authentication" in body && isNonEmptyString(body.authentication)) {
    input.authentication = body.authentication.trim().toUpperCase();
  }
  if ("endpoint" in body && isHttpUrl(body.endpoint)) input.endpoint = body.endpoint;
  if ("enabled" in body && typeof body.enabled === "boolean") input.enabled = body.enabled;

  const suppliedFields = Object.keys(input);
  const invalidFields = connectorFields.filter((field) => field in body && !suppliedFields.includes(field));
  if (invalidFields.length > 0) {
    throw new HttpError(400, "Connector fields have invalid values", { fields: invalidFields });
  }
  if (!partial && suppliedFields.length !== connectorFields.length) {
    throw new HttpError(400, "All connector fields are required", { required_fields: connectorFields });
  }
  if (partial && suppliedFields.length === 0) {
    throw new HttpError(400, "At least one connector field is required for an update");
  }

  return input as Partial<ConnectorInput> | ConnectorInput;
}

function readId(value: string | undefined): number {
  if (!value || !isPositiveInteger(value)) {
    throw invalidIdentifier("Connector ID must be a positive integer", "id", value ?? "");
  }
  return Number(value);
}

export const listConnectors: RequestHandler = (_req, res) => {
  res.json(connectors);
};

export const getConnector: RequestHandler = (req, res) => {
  const id = readId(singleParam(req.params["id"]));
  const connector = connectors.find((record) => record.id === id);
  if (!connector) throw new HttpError(404, "Connector not found", { id });
  res.json(connector);
};

export const createConnector: RequestHandler = (req, res) => {
  const input = readConnectorInput(req.body) as ConnectorInput;
  const connector: Connector = { id: allocateConnectorId(), ...input };
  connectors.push(connector);
  res.status(201).json(connector);
};

export const updateConnector: RequestHandler = (req, res) => {
  const id = readId(singleParam(req.params["id"]));
  const connector = connectors.find((record) => record.id === id);
  if (!connector) throw new HttpError(404, "Connector not found", { id });

  const updates = readConnectorInput(req.body, true) as Partial<ConnectorInput>;
  Object.assign(connector, updates);
  res.json(connector);
};

export const deleteConnector: RequestHandler = (req, res) => {
  const id = readId(singleParam(req.params["id"]));
  const index = connectors.findIndex((record) => record.id === id);
  if (index === -1) throw new HttpError(404, "Connector not found", { id });

  connectors.splice(index, 1);
  res.status(204).send();
};