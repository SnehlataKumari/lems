import * as mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema(
  {
    emailOrMobile: {
      type: String,
      required: [true, 'Phone Or Email is required!'],
    },
    otp: String
  },
  {
    timestamps: true,
  },
);

export { OtpSchema };
