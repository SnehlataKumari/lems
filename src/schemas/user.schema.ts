import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
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
});

//   mobileNumber: {
//     type: String,
//     required: [true, 'Mobile Number is required!'],
//     unique: [true, 'Mobile Number already exists!']
//   },
//   devices: [String],
//   isBlocked: {type: Boolean,default: false},
//   role: {
//     type: String,
//     enum: getKeys(USER_ROLES),
//     default: USER_ROLES['USER'].key
//   },
//   otp: String,
//   payments: [paymentSchema]
// }, {
//   timestamps: true
// }
