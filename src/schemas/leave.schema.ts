import * as mongoose from 'mongoose';

export const LeaveSchema = new mongoose.Schema({
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
  durationOfLeave: {
    type: String,
  },
  endLeaveDate: {
    type: Date,
  },
  leaveNote: {
    type: String,
  },
  startLeaveDate: {
    type: Date,
  },
  typeOfLeave: {
    type: String,
  }
},
  {
    timestamps: true,
  }
);
