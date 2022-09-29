const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies; //cookie parse ap.js e eklenildi
  if (!token) return next(new ErrorHander("Please Login First", 401));

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id); //userModel >jwt.sign({ id: this._d }  nan gelir id:""

  next();
});
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      //req.user.role => bu bize userModelden gelir Default olarak user seklinde ayarladik
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }
    next();
  };
};
