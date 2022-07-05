const User = require("../models/User");
//  status code 201. Created.
//  The request has been fulfilled and has resulted in one or more new resources being created.

// /400 Bad Request
//500=> the HTTP status code 500 is a generic error response. It means that the server encountered an unexpected condition that prevented it from fulfilling the request. This error is usually returned by the server when no other error code is suitable.
const registerUser = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: "myCloud.public_id", url: "myCloud.secure_url" },
    });
    const token = await user.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    if (user) {
      res.status(201).cookie("token", token, options).json({
        success: true,
        message: "Registration is done 😀",
        user, //this is for front end
        token, //it is for cookies in front end we dont use it
      });
    } else {
      res.status(400);
      throw new Error("Error Occured (OzumYazdim=>User wasnt found)");
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      wheereItcomes: "registerUser function from  userController",
    });
  }
};
//yine postman ile post etdik   /logine e
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //userModelde Passwordu select false elemisik deye burda select pass yazdk
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }
    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    if (user && isMatch) {
      res.status(201).cookie("token", token, options).json({
        success: true,
        message: "Loggend in 😀",
        user, //it is for front end
        token, //token foor ciookies
      });
    } else {
      res.status(400);
      throw new Error("Invalid Email ||   User doesnt found");
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      wheereItcomes: "loginUser function from  userController",
    });
  }
};
module.exports = { registerUser, loginUser };
