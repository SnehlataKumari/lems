import { boolean } from '@hapi/joi';
import * as mongoose from 'mongoose';

const LiveClassSchema = new mongoose.Schema({
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
  allowedNoOfStudents: {
    type: Number,
    required: true
  },
  allowedNoOfDemoStudents: {
    type: Number,
    required: true
  },
  approxStreamTime: {
    type: Number,
    required: true
  },
  testId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  classStartTime: {
    type: String,
    required: true
  },
  selectedGroup: {
    type: String,
    required: true
  },
  streamCode: {
    type: String,
    required: true,
    unique: true
  },
  classEndTime: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  posterDocumentId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Document',
  },
  hasAcceptedRequest: {
    type: Boolean,
  },
  isCreatedByAdmin: {
    type: Boolean,
    default: false,
  },
  rejectionReason: {
    type: String,
  },
},
  {
    timestamps: true
  }
);

export { LiveClassSchema };
