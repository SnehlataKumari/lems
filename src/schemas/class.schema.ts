import * as mongoose from 'mongoose';
// const Schema = mongoose.Schema;

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'Class name already exists!'],
    required: [true, 'Name is required!'],
  }
}, {
  timestamps: true
});

ClassSchema.virtual('subjects', {
  ref: 'Subject', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'class', // is equal to `foreignField`
});

export {ClassSchema};