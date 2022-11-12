const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies  //cookie parse ap.js e eklenildi
    // console.log(token, "yoken");
    // console.log(req.headers);
    // const { cookie } = req.headers//bu sekilde yazdik cunki axios ile onderdik Diger metod alinmadi

    // let token = cookie.split("=")[1]


    if (!token) return next(new ErrorHander("Please Login First", 401))


    const decoded = await jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id)//userModel >jwt.sign({ id: this._d }  nan gelir id:""
    next();
})
//bunu...roles eleyerek array formasina getiririk ["admin"]
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            //req.user.role => bu bize userModelden gelir Default olarak user seklinde ayarladik
            return next(
                new ErrorHander(
                    `Role: ${req.user.role} is not allowed to access this resouce `,
                    403
                )
            )
        }
        next();
    }
}
/**eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGQ2MzdhNGUzMmYzYTc1ZDM4ZmZkYyIsImlhdCI6MTY2Njg1MTExNiwiZXhwIjoxNjY3MjgzMTE2fQ.ve3NTg0vWnBcK3oc72-5FhS8HbkQxdFFQMnfQ-VfNxg */