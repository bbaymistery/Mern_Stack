const User = require("../models/User");

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
        user,
        token,
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
        message: "Loggend in 😋",
        user,
        token,
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

const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!userToFollow) {
      res.status(404).json({
        success: false,
        message: "User not found ",
      });
    }

    //!unfollow
    if (loggedInUser.following.includes(userToFollow._id)) {
      const indexFollowing = loggedInUser.following.indexOf(userToFollow._id);
      const indexFollowers = userToFollow.followers.indexOf(loggedInUser._id);

      loggedInUser.following.splice(indexFollowing, 1);
      userToFollow.followers.splice(indexFollowers, 1);
      await loggedInUser.save();
      await userToFollow.save();

      return res.status(200).json({
        success: true,
        message: ` ${loggedInUser.name} doesnt follow  ${userToFollow.name}`,
      });
      //!follow
    } else {
      //i am following (usertoFollow._id)
      loggedInUser.following.push(userToFollow._id); //loggedInUser user is following userTOfoollow
      //he has one follower and it is me(loggedInUser._id)
      userToFollow.followers.push(loggedInUser._id); //UserTofollow has one follower ANd it is loggedInUser

      await loggedInUser.save();
      await userToFollow.save();
      res.status(200).json({
        success: true,
        message: `${loggedInUser.name} start to follow ${userToFollow.name}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { registerUser, loginUser, followUser };
