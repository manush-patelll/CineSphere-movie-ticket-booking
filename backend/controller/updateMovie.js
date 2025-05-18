const { isValidObjectId } = require("mongoose");
const Movies = require("../models/Movies")


const updateMovie = async (req, res) => {
    try {

        const imagepath = req.files["moviePoster"][0].path;
        const imagefilename = req.files["moviePoster"][0].filename;
        const bgImagepath = req.files["movieBackground"][0].path;
        const bgImagefilename = req.files["movieBackground"][0].filename;
        const movieId = req.params.id;

        console.log(movieId)

        if (!isValidObjectId(movieId)) {
            console.log("not valid objectid")
            console.log(req.body)
            return res.status(400).json({ error: "Invalid movie ID format" });
        }

        // Check if movie exists
        const existingMovie = await Movies.findById(movieId);
        if (!existingMovie) {
            console.log("movie not found")
            return res.status(404).json({ error: "Movie not found" });
        }

        const { title, rating, generes, cast, duration, releaseDate, discription } = req.body;
        const generess = generes.split(",");
        const casts = cast.split(",");

        const movie = await Movies.updateOne({ _id: movieId }, {
            title: title,
            generes: generess,
            imagePath: imagepath,
            fileName: imagefilename,
            bgPosterPath: bgImagepath,
            bgPosterName: bgImagefilename,
            cast: casts,
            duration: duration,
            releaseDate: new Date(releaseDate),
            discription: discription
        });

        res.send(movie)

    } catch (error) {
        console.log(error)
    } finally {
        console.log("this is updateer")
    }

}

module.exports = { updateMovie }
