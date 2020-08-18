import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
  selectTest:{
    type: String,
  },
  selectTopic:{
    type: String,
  },
  sectionName:{
    type: String,
  },
  addTest: {
    type: String,
  },
  newContracts: {
    type:String,
  }
},
{
  timestamps: true,
}
);