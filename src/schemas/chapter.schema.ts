import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ChapterSchema = new mongoose.Schema(
  {
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
      required: true,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

ChapterSchema.virtual('assets', {
  ref: 'Asset', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'chapter', // is equal to `foreignField`
});

ChapterSchema.index({ title: 'text', description: 'text' });

ChapterSchema.set('toJSON', { virtuals: true });

export { ChapterSchema };
