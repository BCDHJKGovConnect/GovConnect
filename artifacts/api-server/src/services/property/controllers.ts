import type { RequestHandler } from "express";
import { properties } from "./data/properties";
import { invalidIdentifier, HttpError } from "../../shared/errors";
import { isReference, singleParam } from "../../shared/validation";

export const getPropertyByOwner: RequestHandler = (req, res) => {
  const ownerRef = singleParam(req.params["ownerRef"]);

  if (!ownerRef || !isReference(ownerRef, "P")) {
    throw invalidIdentifier("Owner reference must look like P followed by digits", "owner_ref", ownerRef ?? "");
  }

  const property = properties.find((record) => record.owner_ref === ownerRef);
  if (!property) {
    throw new HttpError(404, "Property owner reference not found", { owner_ref: ownerRef });
  }

  res.json(property);
};