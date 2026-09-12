import { Router } from "express";

import {
    createConsentController,
    grantConsentController,
    revokeConsentController,
    getMyConsents
} from "../controllers/consent.controller";

import {
    authenticate
} from "../middleware/auth.middleware";

const router = Router();


// ========================================
// CREATE CONSENT
// POST /api/consents
// ========================================
router.post(
    "/",
    authenticate,
    createConsentController
);


// ========================================
// GET MY CONSENTS
// GET /api/consents/my
// ========================================
router.get(
    "/my",
    authenticate,
    getMyConsents
);


// ========================================
// GRANT CONSENT
// PATCH /api/consents/:id/grant
// ========================================
router.patch(
    "/:id/grant",
    authenticate,
    grantConsentController
);


// ========================================
// REVOKE CONSENT
// PATCH /api/consents/:id/revoke
// ========================================
router.patch(
    "/:id/revoke",
    authenticate,
    revokeConsentController
);


export default router;