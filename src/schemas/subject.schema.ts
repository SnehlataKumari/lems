import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SubjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // unique: [true, 'Subject title already exists!'],
      required: [true, 'Subject title is required!'],
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

SubjectSchema.virtual('chapters', {
  ref: 'Chapter', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'subject', // is equal to `foreignField`
});

SubjectSchema.virtual('assets', {
  ref: 'Asset', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'subject', // is equal to `foreignField`
});

SubjectSchema.index({ title: 'text', description: 'text' });

SubjectSchema.set('toJSON', { virtuals: true });

export { SubjectSchema };
