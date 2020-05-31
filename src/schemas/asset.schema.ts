import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const s3Schema = new Schema({
  ETag: String,
  Location: String,
  key: String,
  Key: String,
  Bucket: String
});

const AssetSchema = new mongoose.Schema({
  class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  chapter: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
  title: {
    type: String,
    required: [true, 'Title is required!'],
  },
  description: {
    type: String
  },
  videoS3: s3Schema,
  pdfS3: s3Schema,
}, {
  timestamps: true
});

AssetSchema.index({ title: 'text', description: 'text' });

export {AssetSchema};