"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.ChapterSchema = new mongoose.Schema({
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
}, {
    timestamps: true
});
//# sourceMappingURL=chapter.schema.js.map