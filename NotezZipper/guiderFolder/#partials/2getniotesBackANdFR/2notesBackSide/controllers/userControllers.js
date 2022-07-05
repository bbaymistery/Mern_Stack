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

module.exports = { registerUser, getUsers, loginUser };
