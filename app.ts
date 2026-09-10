import express from "express";
import cors from "cors";
import helmet from "helmet";

import healthRoutes from "./routes/health.routes";
import authRoutes from "./routes/auth.routes";
import applicationRoutes from "./routes/application.routes";
import consentRoutes from "./routes/consent.routes";
import verificationRoutes from "./routes/verification.routes";

const app = express();


// ========================================
// SECURITY
// ========================================
app.use(helmet());


// ========================================
// CORS
// ========================================
app.use(cors());


// ========================================
// JSON
// ========================================
app.use(express.json());


// ========================================
// ROOT
// ========================================
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "GovConnect Backend is running"
    });
});


// ========================================
// HEALTH
// ========================================
app.use(
    "/api/health",
    healthRoutes
);


// ========================================
// AUTH
// ========================================
app.use(
    "/api/auth",
    authRoutes
);


// ========================================
// APPLICATIONS
// ========================================
app.use(
    "/api/applications",
    applicationRoutes
);


// ========================================
// CONSENTS
// ========================================
app.use(
    "/api/consents",
    consentRoutes
);


// ========================================
// VERIFICATION
// ========================================
app.use(
    "/api/verification",
    verificationRoutes
);


export default app;