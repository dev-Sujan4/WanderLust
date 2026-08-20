const express = require("express");
const router = express.Router({ mergeParams: true });
exports.router = router;
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController =  require("../controllers/review.js")

//post route
router.post(
  "/",isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview),
);

//Delete review route
router.delete(
  "/:reviewId",isReviewAuthor,
  wrapAsync(reviewController.deleteReview),
);

module.exports = router;
