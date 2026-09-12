import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import identityRoutes from "./routes/identityRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/identity", identityRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Identity Department API is running"
  });
});

const PORT = process.env.PORT || 7101;

app.listen(PORT, () => {
  console.log(`Identity Department running on port ${PORT}`);
});