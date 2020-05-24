import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const VideoSchema = new mongoose.Schema({
  class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  title: {
    type: String,
    required: [true, 'Title is required!'],
  },
  description: {
    type: String
  },
  url: {
    type: String,
    required: [true, 'Video Url is required!'],
  }
}, {
  timestamps: true
});
