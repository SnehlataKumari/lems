import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'Class name already exists!'],
    required: [true, 'Name is required!'],
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
}, {
  timestamps: true
});
