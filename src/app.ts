import express from "express";
import cors from "cors";
import connectDB from "./utils/db";
import authRoute from "./routes/routes.auth";
import userRoute from "./routes/router.user";
import cycleRoute from "./routes/routes.cycle";
import { scheduleNotifications } from "./services/services.notification";

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/cycle", cycleRoute);

scheduleNotifications();

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
