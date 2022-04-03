const productModel = require("../models/productModel.js");
const errorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middlewares/catchAsyncError.js");
const orders = require("../models/orderModel.js");

// create new order

const newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalPrice,
  } = req.body;

  const order = await orders.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalPrice,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(201).json({
    sucess: true,
    order,
  });
});

// admin can access any user id
const getSingleAdminOrder = catchAsyncError(async (req, res, next) => {
  const order = await orders
    .findById(req.params.id)
    .populate("user", "name email");

  if (!order) {
    return next(
      new errorHandler(`Order doesn exist with this ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, order });
});

// logged in user can access--user

const getSingleUserOrder = catchAsyncError(async (req, res, next) => {
  const order = await orders.find({ user: req.user.id });
  if (!order) {
    return next(new errorHandler(`you havent done any order yet `, 400));
  }

  res.status(200).json({ success: true, order });
});

//get admin access to  all users orders ---admin

const getAllOrders = catchAsyncError(async (req, res, next) => {
  const Orders = await orders.find();
  if (!Orders) {
    return next(new errorHandler("There is no order available", 400));
  }

  let totalAmount = 0;
  Orders.forEach((order) => {
    totalAmount = totalAmount + order.totalPrice;
  });

  res.status(200).json({ success: true, totalAmount, Orders });
});

//update orderstatus---->admin

const updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const order = await orders.findById(req.params.id);
  if (!order) {
    return next(new errorHandler("Enter correct order details", 400));
  }

  if (order.orderStatus === "Delivered") {
    return next(
      new errorHandler("You have already Deliverd this order!!", 400)
    );
  }

  order.orderStatus = req.body.status;
  if (order.orderItems == "Delivered") {
    order.deliveredDate = Date.now();
  }
  order.orderItems.forEach(async (ord) => {
    updateStock(ord.product, ord.quantity);
  });

  await order.save({ validateBeforeSave: false });

  res.status(200).json({ success: true, order });
});

const updateStock = async (id, quantity) => {
  const product = await productModel.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
};

// delete order on request of client --->admin

const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await orders.findById(req.params.id);
  if (!order) {
    return next(
      new errorHandler(`No order found with Id ${req.params.id}`, 404)
    );
  };

  await order.remove();
  res.status(200).json({ sucess: true, message: "order deleted successfully" });
});

module.exports = {
  newOrder,
  getSingleAdminOrder,
  getSingleUserOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
};
