import express from "express"; 
import cors from "cors"; 
import dotenv from "dotenv";
import interoperabilityRoutes from "./routes/interoperabilityRoutes";
import { initializeEventListeners } from "./services/eventListenerService";
import applicationTrackerRoutes from "./routes/applicationTrackerRoutes";
import { processRecoveryQueue } from "./services/recoveryProcessorService";
import auditRoutes from "./routes/auditRoutes";

dotenv.config();

initializeEventListeners();

setInterval(() => {
  processRecoveryQueue();
}, 5000);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/interoperability", interoperabilityRoutes);
app.use("/api/tracker", applicationTrackerRoutes);
app.use("/api/audit", auditRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "GovConnect Interoperability Hub is running"
  });
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Interoperability Hub running on port ${PORT}`);
});