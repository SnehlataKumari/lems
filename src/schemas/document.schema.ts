import * as mongoose from 'mongoose';
import { getKeys, USER_ROLES } from 'src/constants';
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    hostUrl: String,
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number,
    fullPath: String
}, {
  timestamps: true
});


export { DocumentSchema };