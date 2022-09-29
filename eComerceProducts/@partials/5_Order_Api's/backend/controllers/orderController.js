const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

/**  @route   /api/v1/order/new */
/**  @post    Create new Order*/
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
    message: "Order created",
    status: 200,
  });
});

/**  @route   /api/v1//order/:id*/
/**  @get    Get Single Order*/
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); //gider user:idblablabla olani kendisinin name ve emailini getiri verir

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
    status: 200,
  });
});

/**  @route   /api/v1/orders/me*/
/**  @get   Get logged in user  Orders*/
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
    message: "seccesed 😵‍💫",
  });
});

/**  @admin */
/**  @route   /api/v1/admin/orders*/
/**  @get     Get all Orders */
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

/**  @admin */
/**  @route   /api/v1/admin/order/:id*/
/**  @put    Update Order Status*/
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order)
    return next(new ErrorHandler("Order not found with this Id", 404));

  if (order.orderStatus === "Delivered")
    return next(new ErrorHandler("You have already delivered this order", 400));

  //product birinci shipped olacagi ucun Sonra deivered olacag Ona gore shipped olanda zaten stokdan bir tane azalticaz Yani deliver olanda birdaha azaltmamiza gerek yok
  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") order.deliveredAt = Date.now();

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

/**  @admin */
/**  @route   /api/v1/admin/order/:id*/
/**  @delete    Delete Order*/
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order)
    return next(new ErrorHandler("Order not found with this Id", 404));

  await order.remove();

  res.status(200).json({
    success: true,
    message: "deleted 😣",
  });
});
