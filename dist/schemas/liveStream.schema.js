"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveStreamSchema = void 0;
const mongoose = require("mongoose");
exports.LiveStreamSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    streamCode: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    assignMentor: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    approxStreamTime: {
        type: String,
        required: true,
    },
    allowWatchCount: {
        type: String,
        required: true,
    },
    group: {
        type: String,
        required: true,
    },
    uploadPoster: {
        type: String,
    }
}, { timestamps: true });
//# sourceMappingURL=liveStream.schema.js.map