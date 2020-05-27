"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const s3Schema = new Schema({
    ETag: String,
    Location: String,
    key: String,
    Key: String,
    Bucket: String
});
exports.VideoSchema = new mongoose.Schema({
    class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    title: {
        type: String,
        required: [true, 'Title is required!'],
    },
    description: {
        type: String
    },
    s3: s3Schema,
}, {
    timestamps: true
});
//# sourceMappingURL=video.schema.js.map