const mongoose = require("mongoose");

const campgroundSchema = mongoose.Schema({
  title: String,
  price: String,
  description: String,
  location: String,
});

const CampgroundModel = mongoose.model("campground", campgroundSchema);

module.exports = {
  CampgroundModel,
};
