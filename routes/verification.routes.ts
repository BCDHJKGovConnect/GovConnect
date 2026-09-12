import { Router } from "express";

import {
    requestVerification
} from "../controllers/verification.controller";

import {
    authenticate
} from "../middleware/auth.middleware";

const router = Router();


// ========================================
// REQUEST VERIFICATION
// POST /api/verification/request
// ========================================
router.post(
    "/request",
    authenticate,
    requestVerification
);


export default router;