"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleNotifications = exports.sendMail = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const models_user_1 = __importDefault(require("../models/models.user"));
const models_cycle_1 = __importDefault(require("../models/models.cycle"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});
const sendMail = (to, subject, text) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
});
exports.sendMail = sendMail;
const scheduleNotifications = () => {
    node_cron_1.default.schedule("0 6 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        // should run every 6am
        const users = yield models_user_1.default.find().populate("partner");
        for (const user of users) {
            const cycle = yield models_cycle_1.default.findOne({ userId: user._id }).sort({
                startDate: -1,
            });
            if (cycle) {
                const today = new Date();
                const { ovulationDate, fertilityWindow } = cycle;
                // send notification about upcoming ovulation
                if (ovulationDate && today <= ovulationDate) {
                    const daysToOvulation = Math.floor((ovulationDate.getTime() - today.getTime()) / (100 * 60 * 60 * 24));
                    console.log(`Sending notification for ${user.name}: ${daysToOvulation} days to ovulation`);
                    if (daysToOvulation <= 2) {
                        yield (0, exports.sendMail)(user.email, "Ovulation Reminder", `Your Ovulation is in ${daysToOvulation} day(s) from now.`);
                        if (user.partner) {
                            yield (0, exports.sendMail)(user.partner, "Partner Ovulation Reminder", `${user.name}'s ovulation is in ${daysToOvulation} day(s) from now`);
                        }
                    }
                }
                // send notification about fertility window
                if (fertilityWindow &&
                    today >= fertilityWindow.start &&
                    today <= fertilityWindow.end) {
                    yield (0, exports.sendMail)(user.email, "Fertility Window Reminder", `You are in your fertility window. ⛔`);
                    if (user.partner) {
                        yield (0, exports.sendMail)(user.partner, "Partner Fertility Window Reminder", `${user.name} is in her fertility window. Take note.`);
                    }
                }
            }
        }
    }));
};
exports.scheduleNotifications = scheduleNotifications;
