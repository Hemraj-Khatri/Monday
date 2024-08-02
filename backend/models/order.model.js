import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  shippingAddress: {
    recipient: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  shippingCharge: {
    type: Number,
    default: 5,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  deliveredArt: {
    type: Date,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "on hold", "in progress", "cancelled", "completed"],
  },
});
const Order = mongoose.model("Order", orderSchema);
export default Order;
