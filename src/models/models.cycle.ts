import mongoose from "mongoose";
import { ICycle } from "../types/cycle";

const cycleSchema = new mongoose.Schema<ICycle>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  symptoms: [{ type: String }],
  cramps: { type: Boolean },
  medications: [{ type: String }],
});

export default mongoose.model<ICycle>("Cycle", cycleSchema);
