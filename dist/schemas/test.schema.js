"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestSchema = void 0;
const mongoose = require("mongoose");
const constants_1 = require("../constants");
exports.TestSchema = new mongoose.Schema({
    teacherIdWhoCreatedTest: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Teacher',
    },
    testDificultyLevel: {
        type: String,
        required: true
    },
    testName: {
        type: String,
    },
    testCode: {
        type: String,
        unique: true,
    },
    totalNoOfQuestions: {
        type: Number,
    },
    testInstruction: {
        type: String,
    },
    testCategory: {
        type: String,
    },
    testDurationInMin: {
        type: String,
    },
    testSettings: {
        arrangementAndGroupingRandomQuestion: {
            shuffleQuestionWithSubject: Boolean,
            groupQuestionSubjectwise: Boolean,
            optionwiseShuffeling: Boolean
        },
        timeSetting: {
            timeBound: Boolean,
            clockFormat: String,
            alloteTimeToEachSection: Boolean,
            questionWiseTime: Boolean,
        },
        generateRank: Boolean,
        candidateReport: Boolean,
        multipleAttempts: Boolean,
        fullScreen: {
            fullScreenMode: { type: Boolean },
            numberOfAttempts: { type: Number }
        }
    },
    questionDetails: {
        subject: {
            type: String
        },
        topic: {
            type: String
        },
        questionType: {
            type: String
        },
        language: {
            type: String
        },
        questions: [
            {
                questionTitle: {
                    type: String
                },
                explanation: {
                    type: String
                },
                tags: {
                    type: String
                },
                rightMarks: {
                    type: Number
                },
                negativeMarks: {
                    type: Number
                },
                dificultyLevel: {
                    type: String
                }
            }
        ]
    },
    publishDetails: {
        isPublished: Boolean,
        startDate: Date,
        startTime: String,
        endDate: Date,
        endTime: String
    }
}, {
    timestamps: true,
});
//# sourceMappingURL=test.schema.js.map