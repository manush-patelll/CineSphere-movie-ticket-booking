const express = require("express");
const createShowRoute = express.Router();
const Showtimes = require("../models/Showtimes");
const Movies = require('../models/Movies');
const Screen = require('../models/Screen');


createShowRoute.post('/', async (req, res) => {
    try {
        const { movie_id, screen_id, start_time, end_time } = req.body;

        // Validate required fields
        if (!movie_id || !screen_id || !start_time || !end_time) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if movie exists
        const movie = await Movies.findById(movie_id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        // Check if screen exists
        const screen = await Screen.findById(screen_id);
        if (!screen) {
            return res.status(404).json({ message: "Screen not found" });
        }

        const newStart = new Date(start_time);
        const newEnd = new Date(end_time);

        // Check if end time is after start time
        if (newEnd <= newStart) {
            return res.status(400).json({ message: "End time must be after start time" });
        }

        // Correct overlap check - finds any existing show that overlaps with new show
        const existingShow = await Showtimes.findOne({
            screen_id,
            $or: [
                // Existing show starts during new show
                { start_time: { $gte: newStart, $lt: newEnd } },
                // Existing show ends during new show
                { end_time: { $gt: newStart, $lte: newEnd } },
                // New show is completely within existing show
                { start_time: { $lte: newStart }, end_time: { $gte: newEnd } }
            ]
        });

        if (existingShow) {
            return res.status(409).json({
                message: "Screen already has a show during this time",
                conflictingShow: existingShow
            });
        }

        // Create new showtime
        const newShowtime = new Showtimes({
            movie_id,
            screen_id,
            start_time: newStart,
            end_time: newEnd,
            bookedSeats: [],
            is_active: true
        });

        await newShowtime.save();

        res.status(201).json({
            message: "Showtime created successfully",
            showtime: newShowtime
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

createShowRoute.get("/:movieId", async (req, res) => {
    try {
        const movieid = req.params.movieId;
        console.log(movieid)
        console.log("Hello")
        const showtimes = await Showtimes.find({ movie_id: movieid }).populate("movie_id", "title")
        console.log(showtimes)
        res.status(200).json({ message: "success", data: showtimes })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error", error: error.message })
    }
})

createShowRoute.delete("/:showId", async (req, res) => {
    try {
        const showId = req.params.showId;
        await Showtimes.deleteOne({ _id: showId });
        res.status(200).json({ message: "show deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Show delete Error", error: error.message })
    }

})

createShowRoute.get("/", async (req, res) => {
    try {
        const showtimes = await Showtimes.find({});
        res.status(200).json({ message: "success", data: showtimes })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = createShowRoute;