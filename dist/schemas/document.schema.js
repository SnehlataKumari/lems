"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentSchema = void 0;
const mongoose = require("mongoose");
const constants_1 = require("../constants");
const Schema = mongoose.Schema;
const DocumentSchema = new Schema({
    hostUrl: String,
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number,
    fullPath: String
}, {
    timestamps: true
});
exports.DocumentSchema = DocumentSchema;
//# sourceMappingURL=document.schema.js.map