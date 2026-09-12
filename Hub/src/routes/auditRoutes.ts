import { Router } from "express";
import { getAuditLogsController } from "../controllers/auditController";

const router = Router();

router.get("/", getAuditLogsController);

export default router;