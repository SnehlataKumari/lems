import * as mongoose from 'mongoose';
// import { getKeys, USER_ROLES } from 'src/constants';
const Schema = mongoose.Schema;

export const LoginSchema = new mongoose.Schema({
  emailAddress: {
    type: String,
  },
  password: { 
    type: String,
    required: [true, 'Password is required!'],
  },
});
