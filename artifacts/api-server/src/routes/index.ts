import { Router, type IRouter } from "express";
import healthRouter from "./health";
import connectorsRouter from "../services/connector/routes";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/connectors", connectorsRouter);

export default router;
