const express = require("express");
const reviewsRoutes = express.Router();
const Reviews = require("../models/Reviews");
const Movies = require("../models/Movies");
const Users = require("../models/User")

reviewsRoutes.post("/", async (req, res) => {
    try {
        const { movieId, userId, rating, comment } = req.body;
        console.log(req.body)
        console.log(movieId)
        // 1. Create new review
        const newReview = await Reviews.create({
            movieId: movieId,
            userId: userId,
            rating: rating,
            comment: comment,
        });

        // 2. Calculate new average rating for the movie
        const response = await Reviews.aggregate([
            {
                $match: { movieId: newReview.movieId } // filter for this movie only
            },
            {
                $group: {
                    _id: "$movieId",
                    averageRating: { $avg: "$rating" }
                }
            }
        ]);

        // 3. Update movie with new average rating
        const avgRating = response[0]?.averageRating || 0;
        await Movies.updateOne({ _id: movieId }, { rating: avgRating });

        res.status(200).json({ message: "Review added and movie rating updated" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

reviewsRoutes.get("/:movieId", async (req, res) => {
    try {
        const mId = req.params.movieId;

        // Fetch all reviews for the given movie and populate user name
        const reviews = await Reviews.find({ movieId: mId })
            .populate("userId", "name") // populate only the "name" field of the user

        res.status(200).json({ message: "success", review: reviews });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = reviewsRoutes;
