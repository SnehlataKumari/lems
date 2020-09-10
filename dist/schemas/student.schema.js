"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentSchema = void 0;
const mongoose = require("mongoose");
exports.StudentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    preferedLanguage: String
}, {
    timestamps: true,
});
//# sourceMappingURL=student.schema.js.map