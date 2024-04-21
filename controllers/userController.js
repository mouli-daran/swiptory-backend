const Stories = require("../model/stories");
const User = require("../model/user");
const cookieToken = require("../utils/cookieToken");

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    console.log(username, password);

    if (!username || !password) {
      return next(new Error("Username and password are required"));
    }

    const isUserNameAlreadyPresent = await User.findOne({ username });

    if (isUserNameAlreadyPresent) {
      return res.status(409).json({
        message: "Username is already registered",
      });
    }

    const user = await User.create({
      username,
      password,
    });

    cookieToken(user, res);
  } catch (error) {
    console.log(error);
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new Error("Username and password are required"));
    }

    console.log(username, password);

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return res.status(409).json({
        message: "User is not registered",
      });
    }

    const isPasswordCorrect = await user.isValidatedPassword(password);

    if (!isPasswordCorrect)
      return next(new Error("You are password is wrong", 400));

    cookieToken(user, res);
  } catch (error) {
    console.log(error);
  }
};

exports.logOut = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logout Success",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getUserdetails = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const userId = req.params.id;
    const individualUserDetails = await User.findById(userId);

    if (!individualUserDetails) {
      return res.status(400).json({
        success: false,
        message: "There are no stories avaiable ",
      });
    }

    // Find stories associated with the user
    const userStories = await Stories.find({ userId });

    res.status(200).json({
      success: true,
      user: individualUserDetails,
      stories: userStories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
