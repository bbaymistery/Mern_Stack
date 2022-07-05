const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

//birinci postman ile post etdik

/**{
    "name":"Elgun",
    "email":"Piyashur",
    "password":"12345"
} */
const registerUser = asyncHandler(async (req, res) => {
  //we r requesting all the stuff from user
  const { name, email, password } = req.body;
  //checking if user exist or not
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  //if user doesnt exist create a new user
  const user = await User.create({ name, email, password });

  if (user) {
    //all it comes from userModel mongoose
    res.status(201).json({
      //if usercreated <==201
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin, //by def it is false
      password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});
//

//!Authentication User
//yine postman ile post etdik   /logine e
const loginUser = asyncHandler(async (req, res) => {
  //we r requesting all the stuff from user
  const { password, email } = req.body;

  const user = await User.findOne({ email });
  //await user.matchPassword(password) bu fonksyonu usermodel de cagirdig
  //await user.matchPassword(password)  =>bu fonksyon pasportun dogru olub olmadigini yoxluyur
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin, //by default it is false
      password: user.password,
      statusCode: "You logged in succesfully",
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email ||   User doesnt found");
  }
});
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
module.exports = { registerUser, getUsers, loginUser, updateUserProfile };
