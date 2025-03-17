const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  heading: String,
  description: String,
  thumbnail: String,  // Will store image path
  price: Number,
  daysNights: String,
});

module.exports = mongoose.model("Package", PackageSchema);
