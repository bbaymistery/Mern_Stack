const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const cloudinary = require("cloudinary");
const sendTokenToSaveInCookie = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

/**  @route  /api/v1/register  */
/**  @post */
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  /*
  !burdaki erroru manual olarag yaza bilerdik Fergli alternativ gormek icin direk error.js icine yazdk
  const userExists = await User.findOne({ email });
  if (userExists) return next(new ErrorHandler("User already exists", 400));
   */

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is si,ple id",
      url: "pickurl",
    },
  });
  sendTokenToSaveInCookie(user, 200, "Registered Succesfully 😃", res);
});

/**  @route    /api/v1/login  */
/**  @post */
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!email && !password)
    return next(new ErrorHandler("Please Enter Email & Password", 400));

  if (!user) return next(new ErrorHandler("User doesnt exist", 401));

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new ErrorHandler("Incorrect password", 401));

  sendTokenToSaveInCookie(user, 201, "Loggend in 😋", res);
});

/**  @route    /api/v1/logout  */
/**  @get */
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
    .json({
      success: true,
      message: "Logged out",
      status: 200,
    });
});

/**  @route    /api/v1/password/forgot  */
/**  @post */
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new ErrorHandler("Uset not found", 404));

  const resetPasswordToken = user.getResetPasswordToken();

  //getResetPassToken fonksiyonu ile userShemaya yeni token ekledik ve onu asagidaki fonksiyon ile save etdk
  await user.save({ validateBeforeSave: false });

  //whenever client will click this link it will redirect client to another route(api/v1/password/reset/:token ) Which we r gonna make it below
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetPasswordToken}`;

  //bu messaj mailrap.io oda gozuken mesajdi
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

/**  @route    /api/v1/password/reset/:token  */
/**  @put */
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );

  if (req.body.password !== req.body.confirmPassword)
    return next(new ErrorHander("Password does not password", 400));

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  console.log(user);
  /*
    1.step postman ile forgotpassword request elyrl
    2.step gmaile gedib, gonderilenlerden link icinden tokeni alib
     postman ile put request gonderirik  =>/api/v1/password/reset/:token
    3.step password ve confirmatio password seklinde put requesti tamamliyiriq
  */
  await user.save();

  sendTokenToSaveInCookie(user, 200, "Password changed 🙄", res);
});
