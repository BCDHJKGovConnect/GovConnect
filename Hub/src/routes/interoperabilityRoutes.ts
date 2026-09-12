import { Router } from "express";
import { verifyApplication } from "../controllers/interoperabilityController";

const router = Router();

router.post("/verify", verifyApplication);

export default router;