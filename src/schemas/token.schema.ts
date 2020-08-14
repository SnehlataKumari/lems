import * as mongoose from 'mongoose';
import { getKeys, TOKEN_TYPES } from 'src/constants';

export const TokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: getKeys(TOKEN_TYPES),
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
