const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Apifeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
/**  @desc    Create new product */
/**  @route   POST /api/v1//product/new  */
/**  @access_Admin */
exports.createProduct = catchAsyncErrors(async (req, res, next) => {


  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else { images = req.body.images; }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], { folder: "products", });
    imagesLinks.push({ public_id: result.public_id, url: result.secure_url, });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product, message: "New Product created", status: 201, });
});

/**  @desc    Get all products*/
/**  @route   GET /api/v1/products  */
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 6;
  const productsCount = await Product.countDocuments();

  let apiFeature = new Apifeatures(Product.find(), req.query).search().filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();
  res.status(200).json({
    success: true, products, productsCount, resultPerPage, filteredProductsCount,
  });
});


/**  @desc    Get all  admin products*/
/**  @route   GET api/v1/admin/products */
/**  @access_Admin */
exports.getAdminProducts = catchAsyncErrors(async (req, res) => {
  let products = await Product.find();
  res.status(200).json({
    success: true,
    products,
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
// Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

/**  @desc    Delete Product*/
/**  @route   DELETE /api/v1/product/:id */
/**  @access_Admin */
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 500));
  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
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
  reviews.forEach((rev) => { avg += rev.rating; });
  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numOfReviews, },
    { new: true, runValidators: true, useFindAndModify: false, }
  );

  res.status(200).json({ success: true, status: 200, mesasge: "sth deleted 🥶", });
});
