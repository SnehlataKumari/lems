import * as mongoose from 'mongoose';
import { getKeys, USER_ROLES } from 'src/constants';

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: getKeys(USER_ROLES),
      default: USER_ROLES['STUDENT'].key,
    },
  },
  {
    timestamps: true,
  },
);

//   mobileNumber: {
//     type: String,
//     required: [true, 'Mobile Number is required!'],
//     unique: [true, 'Mobile Number already exists!']
//   },
//   devices: [String],
//   isBlocked: {type: Boolean,default: false},
//   otp: String,
//   payments: [paymentSchema]
// }, import { getKeys, TOKEN_TYPES } from 'src/constants';
