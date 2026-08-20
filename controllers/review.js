const Listing = require("../models/listing");
const Review = require("../models/review")

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review({
    comment: req.body.comment,
    rating: req.body.rating,
    author: req.user._id,
  });
  listing.reviews.push(newReview._id);
  await newReview.save();
  await listing.save();
  req.flash("success", "Review added!");
  res.redirect(`/listings/${req.params.id}`);
};


module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Review.findByIdAndDelete(reviewId);
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
