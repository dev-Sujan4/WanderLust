const express = require("express");
const passport = require("passport");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const userController = require("../controllers/users.js");
const router = express.Router();

//signup user
router.get("/signup",userController.signupUserForm);

router.post(
  "/signup",
  wrapAsync(userController.signupUser),
);

//login user
router.get("/login",userController.loginUserForm);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.loginUser,
);


//logout user
router.get("/logout" ,userController.logoutUser)

module.exports = router;
