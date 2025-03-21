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
const services_cycle_1 = __importDefault(require("../services/services.cycle"));
class CycleControllers {
    createCycleEntry(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { startDate, cycleLength = 28 } = req.body;
                const cycle = yield services_cycle_1.default.createCycle(Object.assign(Object.assign({}, req.body), { cycleLength }));
                res.status(201).json({
                    success: true,
                    message: "Cycle created successfully",
                    data: cycle,
                });
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
    getUserCycles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const cycles = yield services_cycle_1.default.getCyclesByUser(userId);
                res.status(200).json({
                    success: true,
                    message: "Cycles retrieved successfully",
                    data: cycles,
                });
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
    updateCycleEntry(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cycleId } = req.params;
                const updatedCycle = yield services_cycle_1.default.updateCycle(cycleId, req.body);
                res.status(200).json({
                    success: true,
                    message: "Cycle updated successfully",
                    data: updatedCycle,
                });
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
    deleteCycleEntry(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cycleId } = req.params;
                const deletedCycle = yield services_cycle_1.default.deleteCycle(cycleId);
                res.status(200).json({
                    success: true,
                    message: "Cycle deleted successfully!",
                    data: deletedCycle,
                });
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
}
exports.default = new CycleControllers();
