"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSchema = void 0;
const mongoose = require("mongoose");
const constants_1 = require("../constants");
exports.TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: constants_1.getKeys(constants_1.TOKEN_TYPES),
        required: true,
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=token.schema.js.map