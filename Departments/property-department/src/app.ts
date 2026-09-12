import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import propertyRoutes from "./routes/propertyRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/property", propertyRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Property Department API is running"
  });
});

const PORT = process.env.PORT || 7102;

app.listen(PORT, () => {
  console.log(`Property Department running on port ${PORT}`);
});