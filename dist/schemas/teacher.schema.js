"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherSchema = void 0;
const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema({
    Math: {
        type: Boolean,
    },
    Physics: {
        type: Boolean,
    },
    Chemistry: {
        type: Boolean,
    },
    Biology: {
        type: Boolean,
    },
    ComputerScience: {
        type: Boolean,
    },
    English: {
        type: Boolean,
    },
    Hindi: {
        type: Boolean,
    },
    Sanskrit: {
        type: Boolean,
    },
    German: {
        type: Boolean,
    },
    French: {
        type: Boolean,
    },
    SocialStudies: {
        type: Boolean,
    },
    EVS: {
        type: Boolean,
    },
    BussinessStudies: {
        type: Boolean,
    },
    Accountancy: {
        type: Boolean,
    },
    Arabic: {
        type: Boolean,
    },
    Others: {
        type: Boolean,
    },
});
const gradeToTeachSchema = new mongoose.Schema({
    '1 to 5': {
        type: Boolean,
    },
    '6 to 8': {
        type: Boolean,
    },
    '9 & 10': {
        type: Boolean,
    },
    '11 & 12 (Regular Curriculum)': {
        type: Boolean,
    },
    '11 & 12 (JEE Mains Level)': {
        type: Boolean,
    },
    Others: {
        type: Boolean,
    },
});
const availableTimeSchema = new mongoose.Schema({
    '6-7 am': {
        type: Boolean,
    },
    '7-8 am': {
        type: Boolean,
    },
    '8-9 am': {
        type: Boolean,
    },
    '2-3 pm': {
        type: Boolean,
    },
    '3-4 pm': {
        type: Boolean,
    },
    '4-5 pm': {
        type: Boolean,
    },
    '5-6 am': {
        type: Boolean,
    },
    '6-7 pm': {
        type: Boolean,
    },
    '8-9 pm': {
        type: Boolean,
    },
    'Full Time': {
        type: Boolean,
    },
});
const boardSchema = new mongoose.Schema({
    CBSC: {
        type: Boolean,
    },
    ICSC: {
        type: Boolean,
    },
    IGCSE: {
        type: Boolean,
    },
    Others: {
        type: Boolean,
    },
});
exports.TeacherSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    highestQualification: {
        type: String,
    },
    collegeDetails: {
        type: String,
    },
    teachingExperience: {
        type: String,
        required: true,
    },
    primaryTeachingSubjects: {
        type: subjectSchema,
        required: true,
    },
    secondaryTeachingSubjects: {
        type: subjectSchema,
        required: true,
    },
    gradeToTeach: {
        type: gradeToTeachSchema,
        required: true,
    },
    board: {
        type: boardSchema,
        required: true,
    },
    teachingHours: {
        weekdays: {
            type: String,
        },
        weekends: {
            type: String,
        },
    },
    availableTimes: {
        type: availableTimeSchema,
    },
    currentOccupation: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
    },
    typeOfInternetConnection: {
        type: String,
        required: true,
    },
    downloadSpeed: {
        type: String,
        required: true,
    },
    uploadSpeed: {
        type: String,
        required: true,
    },
    screenShotOfInternet: {
        type: [],
    },
    associationWithLems: {
        type: String,
        required: true,
    },
    howKnowLemsAcademy: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    resume: {
        type: [],
    },
    termsAndConditions: {
        type: Boolean,
        default: false,
    },
    aboutMe: {
        type: String
    },
    extraField: {
        type: String
    },
    hasAcceptedRegistrationRequest: {
        type: Boolean
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=teacher.schema.js.map