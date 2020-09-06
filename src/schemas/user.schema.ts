import * as mongoose from 'mongoose';
import { getKeys, USER_ROLES,} from 'src/constants';

export const UserSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, 'Name is required!'],
    },
    lastName: {
      type: String,
      // required: [true, 'Name is required!'],
    },
    gender: {
      type: String,
      // enum: getKeys(GENDER),
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    password: {
      type: String,
    },
    grade: {
      type: String,
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
