const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref:"User",
      required:true
    },
    shippingDetails: {
      type: "String",
      required: true,
      trim: true,
    },
    orderdProducts: {
      type: "String",
      required:true,
      trim: true,
    },
    paymentMode: {
      type: "String",
      required: true,
    },
    orderStatus: {
      type: "String",
      default:"pending",
      required: true,
    },
  },
  { timestamps: true }
);

//productSchema.index({ productName: "text" });
module.exports = mongoose.model("Order", orderSchema);