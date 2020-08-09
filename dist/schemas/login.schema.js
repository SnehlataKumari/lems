"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.LoginSchema = new mongoose.Schema({
    emailAddress: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
    },
});
//# sourceMappingURL=login.schema.js.map