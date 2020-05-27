"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
const constants_1 = require("../constants");
const Schema = mongoose.Schema;
exports.UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    mobileNumber: {
        type: String,
        required: [true, 'Mobile Number is required!'],
        unique: [true, 'Mobile Number already exists!']
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
    },
    isSubscribed: {
        type: Boolean,
        default: false
    },
    isBlocked: { type: Boolean, default: false },
    role: {
        type: String,
        enum: constants_1.getKeys(constants_1.USER_ROLES),
        default: constants_1.USER_ROLES['USER'].key
    },
    otp: String
}, {
    timestamps: true
});
//# sourceMappingURL=user.schema.js.map