import { Router } from "express";
import { getPropertyByOwner } from "./controllers";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ service: "Property Service", status: "UP" });
});

router.get("/owner/:ownerRef", getPropertyByOwner);

export default router;