import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const s3Schema = new Schema({
  ETag: String,
  Location: String,
  key: String,
  Key: String,
  Bucket: String
});

export const VideoSchema = new mongoose.Schema({
  class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  title: {
    type: String,
    required: [true, 'Title is required!'],
  },
  description: {
    type: String
  },
  s3: s3Schema,
}, {
  timestamps: true
});
