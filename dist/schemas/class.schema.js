"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.ClassSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'Class name already exists!'],
        required: [true, 'Name is required!'],
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
}, {
    timestamps: true
});
//# sourceMappingURL=class.schema.js.map