"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSchema = void 0;
const mongoose = require("mongoose");
exports.TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['LOGIN', 'VERIFY_EMAIL', 'FORGOT_PASSWORD'],
        required: true
    }
}, {
    timestamps: true
});
//# sourceMappingURL=token.schema.js.map