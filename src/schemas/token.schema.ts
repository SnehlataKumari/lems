import * as mongoose from 'mongoose';

export const TokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['LOGIN', 'VERIFY_EMAIL', 'FORGOT_PASSWORD'],
      required: true,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
