const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

/**  @Admin */
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

/**@Admin_finidhed */

router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getProductDetails); //bununla Add product ekliyirik front terefed

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);
module.exports = router;
