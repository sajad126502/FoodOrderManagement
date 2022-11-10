const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    fileName: {
      type: "String",
      required: true,
    },
    productName: {
      type: "String",
      required: true,
      trim: true,
      maxlength: 60,
    },
    productDesc: {
      type: "String",
      trim: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productCategory: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ productName: "text" });
module.exports = mongoose.model("Product", productSchema);
