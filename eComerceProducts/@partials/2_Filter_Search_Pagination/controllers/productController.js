const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Apifeatures = require("../utils/apifeatures");
/**  @desc    Get all products*/
/**  @route   GET /api/v1/products  */
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeature = new Apifeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    currentProductCount: products.length,
    productCount,
    products,
    status: 200,
  });
});
