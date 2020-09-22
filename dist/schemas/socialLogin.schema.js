"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialLoginSchema = void 0;
const mongoose = require("mongoose");
exports.SocialLoginSchema = new mongoose.Schema({
    socialLoginType: {
        type: String,
        required: true
    },
    socialLoginId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=socialLogin.schema.js.map