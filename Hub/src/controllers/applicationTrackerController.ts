import { Request, Response } from "express";
import { getApplicationStatus } from "../services/applicationTrackerService";

export const getTrackerStatus = (
  req: Request,
  res: Response
) => {

  const applicationId = req.params.applicationId as string;

  const application = getApplicationStatus(
    applicationId
  );

  if (!application) {
    return res.status(404).json({
      success: false,
      message: "Application not found"
    });
  }

  return res.status(200).json({
    success: true,
    data: application
  });
};