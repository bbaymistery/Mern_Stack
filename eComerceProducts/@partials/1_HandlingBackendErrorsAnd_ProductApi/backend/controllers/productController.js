const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
/**  @desc    Create new product */
/**  @route   POST /api/v1//product/new  */
/**  @access_Admin */
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
    message: "New Product created",
    status: 201,
  });
});

/**  @desc    Get all products*/
/**  @route   GET /api/v1/products  */
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ success: true, products, status: 200 });
});

/**  @desc    Get Single Product  Detail*/
/**  @route   GET /api/v1/product/:id */
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  res.status(200).json({
    success: true,
    product,
    message: "Products was found",
    status: 200,
  });
});

/**  @desc    Update Product*/
/**  @route   PUT /api/v1/product/:id */
/**  @access_Admin */
exports.updateProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    status: 204,
    product,
    message: "resource updated successfully",
  });
});

/**  @desc    Delete Product*/
/**  @route   DELETE /api/v1/product/:id */
/**  @access_Admin */
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 500));

  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully || recource deleted successfully",
    statusCode: 204,
  });
});
