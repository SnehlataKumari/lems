"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ClassSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'Class name already exists!'],
        required: [true, 'Name is required!'],
    }
}, {
    timestamps: true
});
exports.ClassSchema = ClassSchema;
ClassSchema.virtual('subjects', {
    ref: 'Subject',
    localField: '_id',
    foreignField: 'class',
});
//# sourceMappingURL=class.schema.js.map