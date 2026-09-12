import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json({
        success: true,
        service: "GovConnect Backend",
        status: "UP"
    });
});

export default router;