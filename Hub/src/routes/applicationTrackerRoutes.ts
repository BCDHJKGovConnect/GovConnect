import { Router } from "express";
import { getTrackerStatus } from "../controllers/applicationTrackerController";

const router = Router();

router.get("/:applicationId", getTrackerStatus);

export default router;