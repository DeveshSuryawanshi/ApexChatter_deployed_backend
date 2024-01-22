const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await UserModel.findOne({ username });
    if (usernameCheck) {
      return res
        .status(400)
        .json({ msg: "Username already used", status: false });
    }
    const emailCheck = await UserModel.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({ msg: "Email already used", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    newUser.save();
    delete newUser.password;
    return res.status(200).json({
      user: newUser,
      msg: "User registered successfully",
      status: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({
      $or: [{ username: username }, { email: username }],
    }).lean();
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User not found incorrect username", status: false });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Incorrect password", status: false });
    }
    delete user.password;
    return res
      .status(200)
      .json({ user: user, msg: "User login successfully", status: true });
  } catch (error) {
    next(error);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImg = req.body.image;
    const userData = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAvatar: true,
        avatarImg,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ isSet: userData.isAvatar, image: userData.avatarImg });
  } catch (error) {
    next(error);
  }
};

module.exports.getContacts = async (req, res, next) => {
  try {
    const id = req.params.id;
    // const users = await UserModel.find({ _id: { $ne: id } }).select('username email avatarImg _id');
    const users = await UserModel.find({
      _id: { $ne: id },
      isAvatar: true,
    }).select("username email avatarImg _id");
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
