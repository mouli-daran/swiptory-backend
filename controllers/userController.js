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
