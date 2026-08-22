if (process.env.NODE_ENV != "production"){
  require('dotenv').config()
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const session= require("express-session")
const flash = require('connect-flash');
const { MongoStore } = require("connect-mongo");


const listingRouter = require("./routes/listing.js");
const reviewRouter = require ("./routes/review.js")
const userRouter = require ("./routes/user.js");



main()
  // .catch((err) => console.log(err));

  // async function main(){
  //   await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
  // }

async function main() 
{
  await mongoose.connect(process.env.ATLAS_DB_URL, {
  tls: true,
  tlsAllowInvalidCertificates: false,
}
)
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


const store = MongoStore.create({
  mongoUrl: /*"mongodb://127.0.0.1:27017/wanderlust",*/   process.env.ATLAS_DB_URL,
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
  touchAfter: 24 * 3600,               // only resave session once per day unless data changes
});

store.on("error", (err) => {
  console.log("SESSION STORE ERROR:", err);
});

const sessionOptions = {
  store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};



// app.get("/", (req, res) => {
//   res.send("working");
// });


app.use(session(sessionOptions));
app.use(flash());

app.use (passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.success = req.flash ? req.flash("success") : [];
  res.locals.error = req.flash ? req.flash("error") : [];
  res.locals.currUser = req.user || null;
  next();
});


app.use("/listings",listingRouter); 
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);


// random route handler
app.all("/{*splat}", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

//error handler
app.use((err, req, res, next) => {
  let { statusCode = 400, message = "please enter valid values" } = err;
  res.status(statusCode);
  res.render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("listning");
});
