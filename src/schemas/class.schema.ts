import * as mongoose from 'mongoose';

export const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'Class name already exists!'],
    required: [true, 'Name is required!'],
  }
}, {
  timestamps: true
});
