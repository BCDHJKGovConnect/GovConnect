import { Router } from "express";
import { getCitizen } from "./controllers";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ service: "Identity Service", status: "UP" });
});

router.get("/citizen/:id", getCitizen);

export default router;