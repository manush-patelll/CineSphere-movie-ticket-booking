const Movie = require("../models/Movies")


const deleteMovie = async (req, res) => {
    try {
        const movieId = req.params.id
        const movieExists = await Movie.findOne({ _id: movieId })
        if (!movieExists) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const result = await Movie.deleteOne({ _id: movieId })
        res.json({ status: 200, result })
    } catch (error) {
        console.log(error)
        res.status(400);
    }

}
module.exports = { deleteMovie }