import * as mongoose from 'mongoose';
const SubjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: [true, 'Subject already exists!'],
      required: [true, 'Subject title is required!'],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
export { SubjectSchema };
