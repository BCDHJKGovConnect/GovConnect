import { Router } from "express";
import { getCitizenIdentity } from "../controllers/identityController";

const router = Router();

router.get("/citizens/:identityId", getCitizenIdentity);

export default router;