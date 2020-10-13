"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const AddLiveClassSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Teacher',
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    allowWatchCount: {
        type: String,
        required: true
    },
    approxStreamTime: {
        type: Number,
        required: true
    },
    assignTest: {
        type: String,
        required: true
    },
    briefDescription: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    quizStartTime: {
        type: String,
        required: true
    },
    selectGroup: {
        type: String,
        required: true
    },
    streamCode: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    uploadPoster: {
        type: [],
    },
}, {
    timestamps: true
});
//# sourceMappingURL=addLiveClass.schema.js.map