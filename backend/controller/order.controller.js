import asyncHandler from "../middleware/asynchandler.middleware.js";
import Order from "../models/order.model.js";
import ApiError from "../utils/apiError.js";
const addOrder = asyncHandler(async (req, res) => {
  let { orderItems, shippingAddress, itemPrice, shippingCharge, totalPrice } =
    req.body;
  let order = await Order.create({
    orderItems: orderItems.map((item) => ({
      ...item,
      product: item._id,
      _id: undefined,
    })),
    user: req.user._id,
    shippingAddress,
    itemPrice,
    shippingCharge,
    totalPrice,
  });
  res.send({
    message: "Order created with id" + order._id,
    orderId: order._id,
  });
});

const getOders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "name email -_id");
  res.send(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  let id = req.params.id;
  const order = await Order.findById(id).populate("user", "name email -_id");
  if (!order) {
    throw new ApiError(404, "Order Not found");
  }
  res.send(order);
});

const getMyOrders = asyncHandler(async (req, res) => {
  let order = await Order.find({ user: req.user._id }).populate(
    "user",
    "name email -_id"
  );

  res.send(order);
});
const updateOrderStatus = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let status = req.body.status;
  let order = await Order.findById(id);
  if (!order) throw new ApiError(404, "Order Not Found");
  order.status = status;
  if (status == "delivered") {
    order.isDelivered = true;
    order.isPaid = true;
    order.deliveredAt = Date.now();
  }
  order.save();
  res.send({ message: "Order status changed to " + order.status });
});

export { addOrder, getMyOrders, getOders, getOrderById, updateOrderStatus };
