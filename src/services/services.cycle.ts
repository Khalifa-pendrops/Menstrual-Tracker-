import { start } from "repl";
import Cycle from "../models/models.cycle";
import { ICycle, CycleInput } from "../types/cycle";

class CycleServices {
  async createCycle(cycleInput: CycleInput): Promise<ICycle> {
    const { startDate, cycleLength } = cycleInput;
    const { ovulationDate, fertilityWindow } = await this.calculateCyclePhases(
      startDate,
      cycleLength
    );

    const cycle = new Cycle({
      ...cycleInput,
      ovulationDate,
      fertilityWindow,
    });
    return await cycle.save();
  }

  async getCyclesByUser(userId: string): Promise<ICycle[]> {
    return await Cycle.find({ userId });
  }

  async updateCycle(
    cycleId: string,
    updateData: Partial<CycleInput>
  ): Promise<ICycle | null> {
    return await Cycle.findByIdAndUpdate(cycleId, updateData, { new: true });
  }

  async deleteCycle(cycleId: string): Promise<void> {
    await Cycle.findByIdAndDelete(cycleId);
  }

  async calculateCyclePhases(
    startDate: Date,
    cycleLength: number = 28
  ): Promise<Partial<ICycle>> {
    const ovulationDate = new Date(startDate);

    ovulationDate.setDate(startDate.getDate() + cycleLength - 14); // this gets ovulation at 14 days before the next period

    const fertilityWindowStart = new Date(ovulationDate);
    fertilityWindowStart.setDate(ovulationDate.getDate() - 5); // fertility window starts  at 5 days before ovulation

    const fertilityWindowEnd = new Date(ovulationDate);
    fertilityWindowEnd.setDate(ovulationDate.getDate() + 1); // fertility window ends 1 day after ovulation

    return {
      ovulationDate,
      fertilityWindow: {
        start: fertilityWindowStart,
        end: fertilityWindowEnd,
      },
    };
  }
}

export default new CycleServices();
