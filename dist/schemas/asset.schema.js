"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const s3Schema = new Schema({
    ETag: String,
    Location: String,
    key: String,
    Key: String,
    Bucket: String
});
const AssetSchema = new mongoose.Schema({
    class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    chapter: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    title: {
        type: String,
        required: [true, 'Title is required!'],
    },
    description: {
        type: String
    },
    videoS3: s3Schema,
    pdfS3: s3Schema,
}, {
    timestamps: true
});
exports.AssetSchema = AssetSchema;
AssetSchema.index({ title: 'text', description: 'text' });
//# sourceMappingURL=asset.schema.js.map