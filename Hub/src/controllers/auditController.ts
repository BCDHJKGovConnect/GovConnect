import { Request, Response } from "express";
import { getAuditLogs } from "../services/auditService";

export const getAuditLogsController = (
  req: Request,
  res: Response
) => {

  const logs = getAuditLogs();

  return res.status(200).json({
    success: true,
    data: logs
  });
};