const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const Listing = require("../models/listing");
const Review = require("../models/review");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//index route
router.get("/", wrapAsync(listingController.index));

//new listing route
router.get("/new", isLoggedIn, listingController.newListingForm);

//search route
router.get("/search",listingController.searchlisting)

//show route
router.get("/:id", wrapAsync(listingController.showListing));

//create route
router.post(
    "/",
    isLoggedIn,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.createListing)
);

//update get route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.updateListingForm),
);

router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("image"),
  validateListing,
  wrapAsync(listingController.updateListing),
);

// Delete route
router.delete(
  "/:id",
  isOwner,
  isLoggedIn,
  wrapAsync(listingController.deleteListing),
);

module.exports = router;
