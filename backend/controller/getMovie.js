const Movies = require("../models/Movies");

const getMovies = async (req, res) => {
  const movies = await Movies.find({}).sort({ releaseDate: -1 });

  res.json({
    success: true,
    data: movies,
  });
};

const getMovieDetails = async (req, res) => {
  let movieId = req.params.id;
  const movie = await Movies.find({ _id: movieId })

  res.json({
    success: true,
    data: movie
  })
}

module.exports = { getMovies, getMovieDetails };
