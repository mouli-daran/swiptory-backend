const express = require("express");
const router = express.Router();

const { register, logIn, logOut } = require("../controllers/userController");

router.route("/register").post(register);
router.route("/login").post(logIn);
router.route("/logout").get(logOut);

module.exports = router;
