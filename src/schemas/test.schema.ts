import * as mongoose from 'mongoose';
import { getKeys, USER_ROLES, } from 'src/constants';
import { NumberInstance } from 'twilio/lib/rest/pricing/v1/voice/number';

export const TestSchema = new mongoose.Schema(
  {

    isApproved: Boolean,
    teacher: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Teacher',
      // required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      // required: true,
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
    // quiz: {
    //   type: Boolean,
    // },

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
  },
  {
    timestamps: true,
  },
);
