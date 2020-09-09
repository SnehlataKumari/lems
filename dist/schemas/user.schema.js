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
        required: [true, 'Name is required!'],
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    parentEmail: {
        type: String,
    },
    phone: {
        type: Number,
        unique: true,
    },
    parentContactNumber: {
        type: Number,
    },
    password: {
        type: String,
    },
    grade: {
        type: String,
    },
    board: {
        type: String,
    },
    target: {
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
}, {
    timestamps: true,
});
//# sourceMappingURL=user.schema.js.map