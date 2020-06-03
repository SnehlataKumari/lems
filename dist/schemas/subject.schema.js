"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubjectSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'Subject title already exists!'],
        required: [true, 'Subject title is required!'],
    },
    description: {
        type: String,
    }
}, {
    timestamps: true
});
exports.SubjectSchema = SubjectSchema;
SubjectSchema.virtual('classes', {
    ref: 'Class',
    localField: '_id',
    foreignField: 'subject',
});
SubjectSchema.index({ title: 'text', description: 'text' });
SubjectSchema.set('toJSON', { virtuals: true });
//# sourceMappingURL=subject.schema.js.map