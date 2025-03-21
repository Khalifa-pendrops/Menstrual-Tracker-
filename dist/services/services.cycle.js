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
const models_cycle_1 = __importDefault(require("../models/models.cycle"));
class CycleServices {
    createCycle(cycleInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { startDate, cycleLength } = cycleInput;
            const { ovulationDate, fertilityWindow } = yield this.calculateCyclePhases(startDate, cycleLength);
            const cycle = new models_cycle_1.default(Object.assign(Object.assign({}, cycleInput), { ovulationDate,
                fertilityWindow }));
            return yield cycle.save();
        });
    }
    getCyclesByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_cycle_1.default.find({ userId });
        });
    }
    updateCycle(cycleId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_cycle_1.default.findByIdAndUpdate(cycleId, updateData, { new: true });
        });
    }
    deleteCycle(cycleId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_cycle_1.default.findByIdAndDelete(cycleId);
        });
    }
    calculateCyclePhases(startDate_1) {
        return __awaiter(this, arguments, void 0, function* (startDate, cycleLength = 28) {
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
        });
    }
}
exports.default = new CycleServices();
