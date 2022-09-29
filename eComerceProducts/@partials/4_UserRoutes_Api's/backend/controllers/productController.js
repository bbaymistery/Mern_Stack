const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Apifeatures = require("../utils/apifeatures");
/**  @desc    Create new product */
/**  @route   POST /api/v1//product/new  */
/**  @access_Admin */
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
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

/**  @desc   Create new review pr update the review*/
/**  @route   PUT /api/v1/review */
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  //social medi a apde tamamen farkli metod lkullanmisiz Onada bakarsn
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name, //authMiddleware den gelir
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Comment added or updated",
    status: 200,
  });
});

/**  @desc  Get All Reviews of a product*/
/**  @route   GET /api/v1/reviews*/
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  console.log(req.query.id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  res.status(200).json({
    success: true,
    reviews: product.reviews,
    status: 200,
  });
});

/**  @desc  Delete Review*/
/**  @route DELETE /api/v1/reviews*/
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  //burda ki req.query.id olan review aydidir
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    status: 200,
    mesasge: "sth deleted 🥶",
  });
});
