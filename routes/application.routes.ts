import { Router } from "express";

import {
    createApplicationController,
    getApplicationController,
    getMyApplicationsController,
    updateApplicationStatusController,
    requestApplicationVerification
} from "../controllers/application.controller";

import { authenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

router.post(
    "/",
    authenticate,
    requireRole("CITIZEN"),
    createApplicationController
);

router.get(
    "/my",
    authenticate,
    requireRole("CITIZEN"),
    getMyApplicationsController
);

router.post(
    "/:applicationId/verify",
    authenticate,
    requestApplicationVerification
);

router.get(
    "/:id",
    authenticate,
    getApplicationController
);

router.put(
    "/:id/status",
    authenticate,
    requireRole("ADMIN", "DEPARTMENT"),
    updateApplicationStatusController
);

export default router;