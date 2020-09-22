"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
const constants_1 = require("../constants");
exports.UserSchema = new mongoose.Schema({
    profileImage: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
        default: null,
    },
    gender: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        unique: true,
    },
    password: {
        type: String,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: constants_1.getKeys(constants_1.USER_ROLES),
        default: constants_1.USER_ROLES['STUDENT'].key,
    },
    otp: {
        type: String,
    }
}, {
    timestamps: true,
});
//# sourceMappingURL=user.schema.js.map