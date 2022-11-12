const express = require("express");
const {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview, 
    getAdminProducts} = require("../controllers/productsController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();
/**@Products_Routes */
router.route("/products").get(getAllProducts)
router.route("/product/:id").get(getSingleProduct)
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

/** @Admin_Products_Routes */
router.route("/admin/product/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct)
router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
router.route("/admin/product/:id")
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)

router.route("/admin/products")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts)
module.exports = router;