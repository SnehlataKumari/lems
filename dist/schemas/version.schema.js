"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionSchema = void 0;
const mongoose = require("mongoose");
const VersionSchema = new mongoose.Schema({
    version: {
        type: String,
        unique: [true, 'Version name already exists!'],
        required: [true, 'Version is required!'],
    },
}, {
    timestamps: true,
});
exports.VersionSchema = VersionSchema;
//# sourceMappingURL=version.schema.js.map