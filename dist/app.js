"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./utils/db"));
const routes_auth_1 = __importDefault(require("./routes/routes.auth"));
const router_user_1 = __importDefault(require("./routes/router.user"));
const routes_cycle_1 = __importDefault(require("./routes/routes.cycle"));
const services_notification_1 = require("./services/services.notification");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, db_1.default)();
app.use("/api/auth", routes_auth_1.default);
app.use("/api/user", router_user_1.default);
app.use("/api/cycle", routes_cycle_1.default);
(0, services_notification_1.scheduleNotifications)();
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
