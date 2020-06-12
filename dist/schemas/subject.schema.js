"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Subject title is required!'],
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    description: {
        type: String,
    }
}, {
    timestamps: true
});
exports.SubjectSchema = SubjectSchema;
SubjectSchema.virtual('chapters', {
    ref: 'Chapter',
    localField: '_id',
    foreignField: 'subject',
});
SubjectSchema.virtual('assets', {
    ref: 'Asset',
    localField: '_id',
    foreignField: 'subject',
});
SubjectSchema.index({ title: 'text', description: 'text' });
SubjectSchema.set('toJSON', { virtuals: true });
//# sourceMappingURL=subject.schema.js.map