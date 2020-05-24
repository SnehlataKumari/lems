import * as mongoose from 'mongoose';
import { getKeys, USER_ROLES } from 'src/constants';
const Schema = mongoose.Schema;

export const UserSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: [true, 'Name is required!'],
    minlength: 10,
    maxlength: 10
  },
  mobileNumber: { 
    type: String,
    required: [true, 'Mobile Number is required!'],
    unique: [true, 'Mobile Number already exists!']
  },
  class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  isSubscribed: {type: Boolean, default: false},
  isBlocked: {type: Boolean, default: false},
  role: {
    type: String,
    enum: getKeys(USER_ROLES),
    default: USER_ROLES['USER'].key
  },
  otp: String
}, {
  timestamps: true
});
