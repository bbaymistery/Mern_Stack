const User = require("../models/User");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      });
    }
    /*
    !The HyperText Transfer Protocol (HTTP) 401 Unauthorized response status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource
    */

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = { protect };
