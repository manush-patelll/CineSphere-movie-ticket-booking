const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  rating: { type: Number },
  generes: { type: [String] },
  imagePath: { type: String },
  fileName: { type: String },
  bgPosterPath: { type: String },
  bgPosterName: { type: String },
  cast: { type: [String] },
  duration: { type: String },
  releaseDate: { type: Date },
  discription: { type: String },
});

module.exports = mongoose.model("Movie", movieSchema);
