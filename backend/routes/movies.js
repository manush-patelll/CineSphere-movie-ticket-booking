const express = require("express");
const { uploadImages } = require("../middleware/multerImages");
const { createMovie } = require("../controller/uploadMovie");
const { getMovies, getMovieDetails } = require("../controller/getMovie");
const { updateMovie } = require("../controller/updateMovie");
const { deleteMovie } = require("../controller/deleteMovie");
const movieRoute = express.Router();

movieRoute.post("/", uploadImages.fields([{ name: 'moviePoster', maxCount: 1 }, { name: 'movieBackground', maxCount: 1 }]), createMovie);
movieRoute.get("/", getMovies);
movieRoute.get("/:id", getMovieDetails);
movieRoute.put("/:id", uploadImages.fields([{ name: 'moviePoster', maxCount: 1 }, { name: 'movieBackground', maxCount: 1 }]), updateMovie)
movieRoute.delete("/:id", deleteMovie)
module.exports = { movieRoute };