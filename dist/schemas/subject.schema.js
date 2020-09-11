"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectSchema = void 0;
const mongoose = require("mongoose");
const SubjectSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'Subject already exists!'],
        required: [true, 'Subject title is required!'],
    },
    description: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.SubjectSchema = SubjectSchema;
//# sourceMappingURL=subject.schema.js.map