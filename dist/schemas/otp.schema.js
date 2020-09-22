"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpSchema = void 0;
const mongoose = require("mongoose");
const OtpSchema = new mongoose.Schema({
    emailOrMobile: {
        type: String,
        required: [true, 'Phone Or Email is required!'],
    },
    otp: String
}, {
    timestamps: true,
});
exports.OtpSchema = OtpSchema;
//# sourceMappingURL=otp.schema.js.map