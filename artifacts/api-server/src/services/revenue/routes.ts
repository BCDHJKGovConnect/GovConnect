import { Router } from "express";
import { getTaxpayer } from "./controllers";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ service: "Revenue Service", status: "UP" });
});

router.get("/taxpayer/:taxpayerId", getTaxpayer);

export default router;