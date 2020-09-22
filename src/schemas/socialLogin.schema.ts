import * as mongoose from 'mongoose';
export const SocialLoginSchema = new mongoose.Schema(
  {
    socialLoginType: {
      type: String,
      required: true
    },
    socialLoginId: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
