import type { RequestHandler } from "express";
import { taxpayers } from "./data/taxpayers";
import { invalidIdentifier, HttpError } from "../../shared/errors";
import { isReference, singleParam } from "../../shared/validation";

export const getTaxpayer: RequestHandler = (req, res) => {
  const taxpayerId = singleParam(req.params["taxpayerId"]);

  if (!taxpayerId || !isReference(taxpayerId, "T")) {
    throw invalidIdentifier("Taxpayer ID must look like T followed by digits", "taxpayer_id", taxpayerId ?? "");
  }

  const taxpayer = taxpayers.find((record) => record.taxpayer_id === taxpayerId);
  if (!taxpayer) {
    throw new HttpError(404, "Taxpayer not found", { taxpayer_id: taxpayerId });
  }

  res.json(taxpayer);
};