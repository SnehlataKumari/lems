import * as mongoose from 'mongoose';

export const TeacherSchema = new mongoose.Schema(
  {
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
      type: String,
      required: true,
    },
    secondaryTeachingSubjects: {
      type: String,
    },
    gradeToTeach: {
      type: String,
      required: true,
    },
    board: {
      type: String,
      required: true,
    },
    weekDaysTeachingHours: {
      type: String,
    },
    weekendsTeachingHours: {
      type: String,
    },
    availableTime: {
      type: String,
    },
    currentOccupation: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
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
      type: String,
    },
    associationWithLems: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    howKnowLemsAcademy: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
    },
    termsAndConditions: {
      type: Boolean,
      default: false,
    },
    hasAcceptedRegistrationRequest: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);
