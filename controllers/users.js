const User = require("../models/user");

//signup user
module.exports.signupUserForm = (req, res) => {
  res.render("./users/signup.ejs");
};

module.exports.signupUser = async (req, res) => {
  let { username, email, password } = req.body;
  let newUser = new User({ email, username });
  try {
    const registeredUser = await User.register(newUser, password);
    req.flash(
      "success",
      "signup completed, Please login with your credentials",
    );
    res.redirect("/login");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

//login user
module.exports.loginUserForm = (req, res) => {
  res.render("./users/login.ejs");
};

module.exports.loginUser = async (req, res) => {
  req.flash("success", "Welcome back to WanderLust!");
  res.redirect("/listings");
};

//logout user
module.exports.logoutUser = async(req,res,next) =>{
   await req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you have been logged out");
        res.redirect("/listings")
    })
}
