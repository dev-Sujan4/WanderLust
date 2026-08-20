const Listing = require("../models/listing");
const geocode = require("../utils/geocode");

//index route
module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/home.ejs", { allListings });
};


//show route
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate("reviews")
    .populate("owner")
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    });
    const [longitude, latitude] = await geocode(listing.location);

  res.render("listings/show.ejs", { listing, longitude, latitude });
};


// new listing route
module.exports.newListingForm = (req, res) => {
  res.render("listings/new.ejs");
};

// create route
module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  let newListing = new Listing(req.body);
  newListing.owner = req.user._id;
  newListing.image = {url,filename}
  await newListing.save();

  req.flash("success", "New listing created!");
  res.redirect("/listings");
};


//update get route
module.exports.updateListingForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
};


module.exports.updateListing = async (req, res, next) => {
  let listing = await Listing.findByIdAndUpdate(req.params.id, req.body);

  if (typeof req.file !== "undefined"){
  let url = req.file.path;
  let filename = req.file.filename;
  listing.image = {url,filename};
  await listing.save();
  }

  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${req.params.id}`);
};


// Delete route
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
