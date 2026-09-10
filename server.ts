import applicationRoutes from "./routes/application.routes";
import dotenv from "dotenv";
import app from "./app";
import { testDatabaseConnection } from "./config/database";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`GovConnect Backend running on port ${PORT}`);
app.use(
    "/api/applications",
    applicationRoutes
);
    await testDatabaseConnection();
});