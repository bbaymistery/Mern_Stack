const cloudinary = require("cloudinary");
const registerUser = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });
    const user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
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
