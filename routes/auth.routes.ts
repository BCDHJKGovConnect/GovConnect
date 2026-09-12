import { Router } from "express";

import {
    register,
    login,
    getMe
} from "../controllers/auth.controller";

import {
    authenticate
} from "../middleware/auth.middleware";


const router = Router();


// ========================================
// REGISTER
// POST /api/auth/register
// ========================================
router.post(
    "/register",
    register
);


// ========================================
// LOGIN
// POST /api/auth/login
// ========================================
router.post(
    "/login",
    login
);


// ========================================
// GET CURRENT USER
// GET /api/auth/me
// ========================================
router.get(
    "/me",
    authenticate,
    getMe
);


export default router;