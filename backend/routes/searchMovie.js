const express = require("express")
const Movies = require("../models/Movies")
const searchMovieRoute = express.Router()


searchMovieRoute.get("/:q", async (req, res) => {
    const query = req.params.q
    const response = await Movies.find({ $or: [{ title: { $regex: query, $options: "i" } }, { generes: { $elemMatch: { $regex: query, $options: "i" } } }, { cast: { $elemMatch: { $regex: query, $options: "i" } } }] }, { _id: 1, title: 1 })

    res.status(200).json({ movies: response })
})

module.exports = searchMovieRoute