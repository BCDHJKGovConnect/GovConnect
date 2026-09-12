import { Router } from "express";
import { getTaxpayerDetails } from "../controllers/revenueController";

const router = Router();

router.get("/taxpayers/:taxpayerId", getTaxpayerDetails);

export default router;