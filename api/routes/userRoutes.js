const express = require("express");
const router = express.Router();

const {
    loginUser,
    logoutUser,
    registerUser,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUsers,
    getSingleUser,
    updateUserRole,
    deleteUser
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");



/**@Authentication_Routes */
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)
router.route("/register").post(registerUser)
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

/**@User_Routes */
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

/** @Admin_User_Routes */
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)
router.route("/admin/user/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
router.route("/admin/user/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)



module.exports = router;
