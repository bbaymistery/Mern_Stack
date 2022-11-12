const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const productModel = require("../models/productModel");

/**  @post */
/**  @route /api/v1/order/new */
/**@isAuthenticatedUser */
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    //tutorialda  altdan xett olan id yazdi Ama
    //bele fikirlesende zaten altdan xett olan id ile rqeu.user.id ikiside eynidi
    console.log({ ...req.body });
    console.log({ ...req.user._id });

    const order = await Order.create({ ...req.body, paidAt: Date.now(), user: req.user._id })
    //!soru =>neden orderItems icin de product:'idsd23213123'   seklindedi Yani Productin id si ora hardan gelib
    res.status(201).json({ success: true, order, message: "Order Created", status: 200 })
});

/**  @get */
/**  @route /api/v1//order/:id*/
/**@isAuthenticatedUser */
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")
    if (!order) return next(new ErrorHandler("Order not found with this Id", 404));

    res.status(200).json({ success: true, order, status: 200, });
});

/**  @get */
/**  @route /api/v1/orders/me*/
/**@isAuthenticatedUser */
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(201).json({ status: true, orders })
});

/**  @get */
/**  @route /api/v1/admin/orders*/
/** @Access_Admin */
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({});
    let totalAmount = 0;
    orders.forEach((order) => { totalAmount += order.totalPrice });

    res.status(200).json({ success: true, totalAmount, orders, });
});

/**  @put */
/**  @route /api/v1/admin/order/:id*/
/** @Access_Admin */
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
    //! 1step=> herhansi bir producti secib shipping info falan doldurub order edirik.
    //! 2step => oORDER EDILENIN STATUSUNU DEGISMEK UCUN ONUN ID SI ILE REQUEST EDIRIK
    //! 3step => Orderi tapriri statusu gelen requestde status shipped dise stockdan birdene azaldirik
    //! veya shipped oldu sonra delivered dise onda ordere yeni ozellik ekliyirik hansiki DeliveredAT**
    const order = await Order.findById(req.params.id)


    if (!order)
        return next(new ErrorHandler("Order not found with this Id", 404));

    if (order.orderStatus === "Delivered")
        return next(new ErrorHandler("You have already delivered this order", 400));

    console.log(order.orderItems, "11111111111111111111");

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => { await updateStock(o.product, o.quantity) })
        order.orderStatus = "Shipped"  //bu yox idi men ekledim cunki her degisende backdede status degissin
        console.log(order.orderItems, "2222222222");

    }
    if (req.body.status === "Delivered") {
        order.orderStatus = "Delivered"//bu yox idi men ekledim cunki her degisende backdede status degissin
        order.deliveredAt = Date.now()
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({ success: true });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false });
}

/**  @route /api/v1/admin/order/:id*/
/**  @delete  Delete Order*/
/** @Access_Admin */
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order)
        return next(new ErrorHandler("Order not found with this Id", 404));
    await order.remove();
    res.status(200).json({ success: true, message: "deleted 😣", });
});
