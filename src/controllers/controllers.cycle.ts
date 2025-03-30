import { Request, Response } from "express";
import CycleServices from "../services/services.cycle";
import { CycleInput } from "../types/cycle";

class CycleControllers {
  async createCycleEntry(
    req: Request<{}, {}, CycleInput>,
    res: Response
  ): Promise<void> {
    try {
      const { startDate, cycleLength = 28 } = req.body;
      const cycle = await CycleServices.createCycle({
        ...req.body,
        cycleLength,
      });
      res.status(201).json({
        success: true,
        message: "Cycle created successfully",
        data: cycle,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getUserCycles(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const cycles = await CycleServices.getCyclesByUser(userId);
      res.status(200).json({
        success: true,
        message: "Cycles retrieved successfully",
        data: cycles,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateCycleEntry(req: Request, res: Response): Promise<void> {
    try {
      const { cycleId } = req.params;
      const updatedCycle = await CycleServices.updateCycle(cycleId, req.body);
      res.status(200).json({
        success: true,
        message: "Cycle updated successfully",
        data: updatedCycle,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  
  async deleteCycleEntry(req: Request, res: Response) {
    try {
      const { cycleId } = req.params;
      const deletedCycle = await CycleServices.deleteCycle(cycleId);

      res.status(200).json({
        success: true,
        message: "Cycle deleted successfully!",
        data: deletedCycle,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new CycleControllers();


