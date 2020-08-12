import * as mongoose from 'mongoose';

const VersionSchema = new mongoose.Schema(
  {
    version: {
      type: String,
      unique: [true, 'Version name already exists!'],
      required: [true, 'Version is required!'],
    },
  },
  {
    timestamps: true,
  },
);

export { VersionSchema };
