const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      return next(new ExpressError(400, errMsg));
    }
    next();
};


module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    return next(new ExpressError(400, errMsg));
  }
  next();
};

module.exports.isLoggedIn=((req,res,next)=>{
    if (!req.isAuthenticated()){
        req.flash("error","you must be logged in for this facility")
        return res.redirect("/login")
    }
    next();
})


module.exports.isOwner =async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if (listing.owner._id.toString() !== req.user._id.toString()){
        req.flash("error","you don't have the permission to edit this listing")
        return res.redirect(`/listings/${id}`)
    }
    next();
}

module.exports.isReviewAuthor = async(req,res,next) =>{
    let review = await Review.findById(req.params.reviewId).populate("author")
    if (review.author._id.toString()!==req.user._id.toString()){
        req.flash("error","you don't have the permission to delete this review")
        return res.redirect(`/listings/${req.params.id}`)
    }
    next();
}

