"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveClassSchema = void 0;
const mongoose = require("mongoose");
const LiveClassSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Teacher',
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    allowedNoOfStudents: {
        type: Number,
        required: true
    },
    allowedNoOfDemoStudents: {
        type: Number,
        required: true
    },
    approxStreamTime: {
        type: Number,
        required: true
    },
    testId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    classStartTime: {
        type: String,
        required: true
    },
    selectedGroup: {
        type: String,
        required: true
    },
    streamCode: {
        type: String,
        required: true,
        unique: true
    },
    classEndTime: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    posterDocumentId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Document',
    },
    hasAcceptedRequest: {
        type: Boolean,
    },
    rejectionReason: {
        type: String,
    },
}, {
    timestamps: true
});
exports.LiveClassSchema = LiveClassSchema;
//# sourceMappingURL=liveClass.schema.js.map