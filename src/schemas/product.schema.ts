import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    // required: true,
  },
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
  productImageId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Document',
  },
  productDescription: {
    type: String,
  },
  sampleCourse: {
    type: String,
  },
  decideCost: {
    price: {
      type: Number,
      // required: true,
    },
    priceToCompare: {
      type: Number,
      // required: true,
    },
  },
  publishProduct: {
    startPublishDate: {
      type: String,
    },
    endPublishDate: {
      type: String,
    },
  },
},
  {
    timestamps: true
  });