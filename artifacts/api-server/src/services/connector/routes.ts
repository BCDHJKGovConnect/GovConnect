import { Router } from "express";
import {
  createConnector,
  deleteConnector,
  getConnector,
  listConnectors,
  updateConnector,
} from "./controllers";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ service: "Connector Framework", status: "UP" });
});

router.get("/", listConnectors);
router.post("/", createConnector);
router.get("/:id", getConnector);
router.put("/:id", updateConnector);
router.delete("/:id", deleteConnector);

export default router;