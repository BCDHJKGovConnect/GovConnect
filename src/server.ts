import express from "express";
import cors from "cors";

import identityService from "./services/identityService";
import propertyService from "./services/propertyService";
import revenueService from "./services/revenueService";
import connectorService from "./services/connectorService";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Department Services"
  });
});

app.use("/api/identity", identityService);
app.use("/api/property", propertyService);
app.use("/api/revenue", revenueService);
app.use("/api/connector", connectorService);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Department Services running on port ${PORT}`);
});