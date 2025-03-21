import cron from "node-cron";
import nodemailer from "nodemailer";
import User from "../models/models.user";
import Cycle from "../models/models.cycle";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendMail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const scheduleNotifications = () => {
  cron.schedule("0 6 * * *", async () => {
    // should run every 6am
    const users = await User.find().populate("partner");

    for (const user of users) {
      const cycle = await Cycle.findOne({ userId: user._id }).sort({
        startDate: -1,
      });

      if (cycle) {
        const today = new Date();
        const { ovulationDate, fertilityWindow } = cycle;

        // send notification about upcoming ovulation
        if (ovulationDate && today <= ovulationDate) {
          const daysToOvulation = Math.floor(
            (ovulationDate.getTime() - today.getTime()) / (100 * 60 * 60 * 24)
          );
          console.log(
            `Sending notification for ${user.name}: ${daysToOvulation} days to ovulation`
          );
          if (daysToOvulation <= 2) {
            await sendMail(
              user.email,
              "Ovulation Reminder",
              `Your Ovulation is in ${daysToOvulation} day(s) from now.`
            );

            if (user.partner) {
              await sendMail(
                user.partner,
                "Partner Ovulation Reminder",
                `${user.name}'s ovulation is in ${daysToOvulation} day(s) from now`
              );
            }
          }
        }

        // send notification about fertility window
        if (
          fertilityWindow &&
          today >= fertilityWindow.start &&
          today <= fertilityWindow.end
        ) {
          await sendMail(
            user.email,
            "Fertility Window Reminder",
            `You are in your fertility window. ⛔`
          );

          if (user.partner) {
            await sendMail(
              user.partner,
              "Partner Fertility Window Reminder",
              `${user.name} is in her fertility window. Take note.`
            );
          }
        }
      }
    }
  });
};
