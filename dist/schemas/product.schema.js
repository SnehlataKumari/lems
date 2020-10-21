"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose = require("mongoose");
exports.ProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
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
        },
        priceToCompare: {
            type: Number,
        },
        chargeTax: {
            type: Boolean,
        },
    },
    publishProduct: {
        startPublishDate: {
            type: String,
        },
        endPublishDate: {
            type: String,
        },
        publish: Boolean
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=product.schema.js.map