import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ChapterSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: [true, 'Chapter title already exists!'],
    required: [true, 'Chapter title is required!'],
  },
  description: {
    type: String,
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
}, {
  timestamps: true
});
