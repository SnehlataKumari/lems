import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productCode: {
    type: String,
    required: true,
  },
  gradeName: {
    type: String,
  },
  productType: {
    type: String,
  },
  language: {
    type: String,
  },
  courseLevel: {
    type: String,
  },
  courseRestriction: {
    type: String,
  },
  sampleCourse: {
    type: String,
  },
  productImage: {
    type: String,
  },
  productDescription: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  priceToCompare: {
    type: Number,
    required: true,
  },
  starPublishDate: {
    type: String,
  },
  endPublishDate: {
    type: String,
  },
},
  {
    timestamps: true
  });