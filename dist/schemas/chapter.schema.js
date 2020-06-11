"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ChapterSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'Chapter title already exists!'],
        required: [true, 'Chapter title is required!'],
    },
    description: {
        type: String,
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
}, {
    timestamps: true
});
exports.ChapterSchema = ChapterSchema;
ChapterSchema.virtual('assets', {
    ref: 'Asset',
    localField: '_id',
    foreignField: 'chapter',
});
ChapterSchema.index({ title: 'text', description: 'text' });
ChapterSchema.set('toJSON', { virtuals: true });
//# sourceMappingURL=chapter.schema.js.map