import * as mongoose from 'mongoose';
import { getKeys, USER_ROLES, } from 'src/constants';
import { NumberInstance } from 'twilio/lib/rest/pricing/v1/voice/number';

    const assignToGroupSchema = new mongoose.Schema({
      "1st Year": Boolean,
      "2nd Year": Boolean,
      "3rd Year": Boolean,
      "4th Year": Boolean,
      "5th Year": Boolean,
      "6th Year": Boolean,
      "7th Year": Boolean,
      "8th Year": Boolean,
      "9th Year": Boolean,
      "10th Year": Boolean,
    });

const assignToProductSchema = new mongoose.Schema({
     "1st Test Series": Boolean,
    "2nd Test Series": Boolean,
    "3rd Test Series": Boolean,
    "4th Test Series": Boolean,
    "5th Test Series": Boolean,
    "6th Test Series": Boolean,
    "7th Test Series": Boolean,
    "8th Test Series": Boolean,
    "9th Test Series": Boolean,
    "10th Test Series": Boolean,
    "11th Test Series": Boolean,
    "12th Test Series": Boolean,
    "13th Test Series": Boolean,
    "14th Test Series": Boolean,
    "15th Test Series": Boolean,
});
   
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
    assignTestDetails: {
      activeLinks: {
        accessCommonCode: Boolean,
        addLinkToTestOnYourWebsite: String,
        disableAllLinks: Boolean,
        emailLinkToTestTaker: String,
        externalStudyLink: String,
      },
      assignToGroup: {
           type: assignToGroupSchema,
      }, 
      assignToProduct: {
        type: assignToProductSchema,
      }, 
      publishDetails: {
        isPublished: Boolean,
        startDate: Date,
        startTime: String,
        endDate: Date,
        endTime: String
      },
    }, 
  },
  {
    timestamps: true,
  },
);
