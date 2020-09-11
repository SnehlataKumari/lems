"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentSchema = void 0;
const mongoose = require("mongoose");
exports.StudentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    preferedLanguage: String,
    isThisParentLogin: Boolean,
    education: {
        board: String,
        grade: String,
        targetExam: String,
        school: String,
    },
    guardians: [
        {
            guardianType: String,
            firstName: String,
            lastName: String,
            mobileNumber: String,
            email: String,
        }
    ],
    address: {
        streetAddress: String,
        streetAddress2: String,
        city: String,
        state: String,
        country: String,
        pincode: String,
    },
    studentActivities: {
        interest: String,
        pastPerformances: String,
        schoolActivities: String,
        strengths: String,
    }
}, {
    timestamps: true,
});
//# sourceMappingURL=student.schema.js.map