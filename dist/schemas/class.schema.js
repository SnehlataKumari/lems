"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassSchema = void 0;
const mongoose = require("mongoose");
exports.ClassSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'Class name already exists!'],
        required: [true, 'Name is required!'],
    }
}, {
    timestamps: true
});
//# sourceMappingURL=class.schema.js.map