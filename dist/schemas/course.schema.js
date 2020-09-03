"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSchema = void 0;
const mongoose = require("mongoose");
exports.CourseSchema = new mongoose.Schema({
    selectTest: {
        type: String,
    },
    selectTopic: {
        type: String,
    },
    sectionName: {
        type: String,
    },
    addTest: {
        type: String,
    },
    newContracts: {
        type: String,
    }
}, {
    timestamps: true,
});
//# sourceMappingURL=course.schema.js.map