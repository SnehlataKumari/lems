"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveSchema = void 0;
const mongoose = require("mongoose");
exports.LeaveSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Teacher',
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    durationOfLeave: {
        type: String,
    },
    endLeaveDate: {
        type: Date,
    },
    leaveNote: {
        type: String,
    },
    startLeaveDate: {
        type: Date,
    },
    typeOfLeave: {
        type: String,
    }
}, {
    timestamps: true,
});
//# sourceMappingURL=leave.schema.js.map