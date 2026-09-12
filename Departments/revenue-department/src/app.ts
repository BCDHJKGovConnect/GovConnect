import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import revenueRoutes from "./routes/revenueRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/revenue", revenueRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Revenue Department API is running"
  });
});

const PORT = process.env.PORT || 7103;

app.listen(PORT, () => {
  console.log(`Revenue Department running on port ${PORT}`);
});