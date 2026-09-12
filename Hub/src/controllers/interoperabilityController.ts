import { Request, Response } from "express";
import { verifyApplicationService } from "../services/verificationService";

export const verifyApplication = async (
  req: Request,
  res: Response
) => {
  const {
    applicationId,
    citizenId,
    purpose
  } = req.body;

  if (!applicationId || !citizenId || !purpose) {
    return res.status(400).json({
      success: false,
      message: "applicationId, citizenId and purpose are required"
    });
  }

  try {
    const result = await verifyApplicationService(
      applicationId,
      citizenId,
      purpose
    );

    return res.status(200).json(result);

  } catch (error) {

    console.error("Interoperability verification failed:", error);

    return res.status(503).json({
      success: false,
      applicationId,
      citizenId,
      purpose,
      verificationStatus: "DEPARTMENT_UNAVAILABLE",
      message: "A department is temporarily unavailable after retry attempts"
    });
  }
};