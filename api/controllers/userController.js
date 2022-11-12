const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const crypto = require("crypto");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const cloudinary = require("cloudinary");
const sendTokenToSaveInCookie = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

/**@post */
/**@route /api/v1/register */
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    let { name, username, lastname, email, avatar, password } = req.body
    const myCloud = null
    if (avatar) {
        myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatarsEcommerce",
            width: 150,
            crop: "scale",
        })
    }
    const user = await User.create({
        name,
        username,
        lastname,
        email,
        password,
        avatar: myCloud ?
            { public_id: myCloud.public_id, url: myCloud.secure_url }
            : { public_id: "", url: "" },
    })
    sendTokenToSaveInCookie(user, 200, "Registered Succesfully 😃", res);
})

/**@post */
/**@route /api/v1/login */
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select("+password")

    if (!email || !password)
        return next(new ErrorHandler("Please Enter Email & Password", 400))

    if (!user) return next(new ErrorHandler("User doesnt exist", 401))

    const isMatch = await user.comparePassword(password)
    if (!isMatch) return next(new ErrorHandler("Incorrect password", 401));

    sendTokenToSaveInCookie(user, 201, "Loggend in 😋", res);
})

/**@get */
/**@route /api/v1/logout */
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res
        .status(200)
        .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
        .json({ success: true, message: "Logged out ☺️", status: 200, })
})


/**@post */
/**@route /api/v1/password/forgot */
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) return next(new ErrorHandler("Uset not found", 404));

    const resetPasswordToken = user.getResetPasswordToken();

    //getResetPassToken fonksiyonu ile userShemaya yeni token ekledik ve onu asagidaki fonksiyon ile save etdk
    await user.save({ validateBeforeSave: false })

    //whenever client will click this link it will redirect client to another route(api/v1/password/reset/:token ) Which we r gonna make it below

    // const resetPasswordUrl = `
    //   ${req.protocol}://localhost:3000/password/reset/${resetPasswordToken}
    //   `
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetPasswordToken}`;

    const message = `
    Your password reset token is :-
     \n\n ${resetPasswordUrl} \n\n
     If you have not requested this email then, please ignore it.

     Owner of website is: https://www.linkedin.com/in/elgun-ezmemmedov-1628a51b4
     `;
    //this the mesage will will be shown on mailtrap.io

    try {
        await sendEmail({ email, subject: "Ecommerce password Recovery", message })

        res
            .status(200)
            .json({
                success: true,
                message: `Email sent to ${user.email} successfully`,
            })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }
})


/**@post */
/**@route /api/v1/password/reset/:token */
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    //creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    })

    let userMessage = "Reset Password Token is invalid or has been expired"
    if (!user) return next(new ErrorHandler(userMessage), 400)

    let pasMes = "Password does not match with confirm password"
    if (req.body.password !== req.body.confirmPassword) return next(new ErrorHandler(pasMes, 400));

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    /*
      1.step postman ile forgotpassword request elyrl
      2.step gmaile gedib, gonderilenlerden link icinden tokeni alib
       postman ile put request gonderirik  =>/api/v1/password/reset/:token
      3.step password ve confirmatio password seklinde put requesti tamamliyiriq
    */
    await user.save();

    sendTokenToSaveInCookie(user, 200, "Password changed 🙄", res);
})


/**@get */
/**@route /api/v1/me */
/**@isAuthenticatedUser */
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (!user) next(new ErrorHandler("User not found", 404));
    res.status(200).json({ success: true, status: 200, user })
})


/**@put */
/**@route /api/v1/password/update */
/**@isAuthenticatedUser */
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password")
    const { newPassword, oldPassword, confirmPassword } = req.body

    if (!newPassword || !oldPassword)
        return next(new ErrorHandler("Please provide old and new password", 400));

    const isMatch = await user.comparePassword(oldPassword)
    if (!isMatch) return next(new ErrorHandler("Old password is incorrect", 400));

    if (newPassword !== confirmPassword)
        return next(new ErrorHandler("password does not match", 400));

    user.password = newPassword

    await user.save()
    sendTokenToSaveInCookie(user, 200, "Password Update ☺️", res);
})



/** @put */
/** @route    /api/v1/me/update */
/**@isAuthenticatedUser */
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const { email, name, username, lastname } = req.body
    const newUser = { name, email, username, lastname }
    if (!email || !name || !username || !lastname)
        return next(new ErrorHandler("Email ,lastname,username,name is missing", 400));

    if (req?.body?.avatar?.length > 0) {
        console.log(email, name, username, lastname);
        const user = await User.findById(req.user.id)
        if (user.avatar.public_id) {
            await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
        }
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });
        //!sileme olayinida ekleee
        if (myCloud.public_id) {
            newUser.avatar = { public_id: myCloud.public_id, url: myCloud.secure_url, };
            // console.log(req.user._id, myCloud.secure_url);
            //eger profile degiserse ve bizim productlarin icinde o profile aid review varsa onunda imagenidegisirik
            const query = { "reviews.user": req.user._id };
            const updateDocument = {
                $set: { "reviews.$.userImage": myCloud.secure_url }
            };
            await Product.updateOne(query, updateDocument);
        }

    }
    await User.findByIdAndUpdate(req.user.id, newUser, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    // await products.save()
    res.status(200).json({ success: true, status: 200, message: "Profile Updated" })
})

/** @get */
/** @route    /api/v1/admin/users */
/** @Access_Admin */
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({ success: true, users })
})

/** @get */
/** @route    /api/v1/admin/user/:id */
/** @Access_Admin */
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`))
    res.status(200).json({ success: true, user })
})

/** @get */
/**  @route    /api/v1/admin/user/:id */
/** @Access_Admin */
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        context: "query", //bunu arasdir niye bele yazir diye
        useFindAndModify: true
    })
    res.status(200).json({ success: true, message: "User role updated" })

})


/** @get */
/**  @route    /api/v1/admin/user/:id */
/** @Access_Admin */
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user)
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400));
    await user.remove();
    res.status(200).json({
        success: true,
        message: "User Deleted Successfully 💖",
    });
})

