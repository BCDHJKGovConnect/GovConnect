import { Router } from "express";
import { getPropertyDetails } from "../controllers/propertyController";

const router = Router();

router.get("/properties/:propertyId", getPropertyDetails);

export default router;