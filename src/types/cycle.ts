import { Document, Schema } from "mongoose";

export interface ICycle extends Document {
  userId: Schema.Types.ObjectId;
  startDate: Date;
  endDate?: Date;
  cycleLength?: number;
  symptoms: string[];
  cramps: boolean;
  medications: string[];
  ovulationDate?: Date;
  fertilityWindow?: {
    start: Date;
    end: Date;
  };
}

export type CycleInput = {
  userId: string;
  startDate: Date;
  endDate?: Date;
  cycleLength?: number;
  symptoms: string[];
  cramps: boolean;
  medications: string[];
  ovulationDate?: Date;
  fertilityWindow?: {
    start: Date;
    end: Date;
  };
};
