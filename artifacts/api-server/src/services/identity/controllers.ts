import type { RequestHandler } from "express";
import { citizens } from "./data/citizens";
import { invalidIdentifier, HttpError } from "../../shared/errors";
import { isPositiveInteger, singleParam } from "../../shared/validation";

export const getCitizen: RequestHandler = (req, res) => {
  const id = singleParam(req.params["id"]);

  if (!id || !isPositiveInteger(id)) {
    throw invalidIdentifier("Citizen ID must be a positive integer", "citizen_id", id ?? "");
  }

  const citizen = citizens.find((record) => record.citizen_id === Number(id));
  if (!citizen) {
    throw new HttpError(404, "Citizen not found", { citizen_id: Number(id) });
  }

  res.json(citizen);
};