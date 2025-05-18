const express = require("express");
const jwt = require("jsonwebtoken");
const Booking = require("../models/Booking");
const getBookingsRoute = express.Router()

getBookingsRoute.get("/", async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ token: false, valid: false })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)

        const bookingDetails = await Booking.find({ user_id: decoded.id }, { screen_id: 1, showtime_id: 1, seats: 1, total_amount: 1, booking_reference: 1 })
            .populate("screen_id", "screenName") // Populate screen name
            .populate({
                path: "showtime_id",
                populate: {
                    path: "movie_id",
                    model: "Movie", // <-- Correct model name here
                    select: "title" // <-- Select only title field from Movie
                }
            });

        res.status(200).json({ message: "success", bookingDetails })
    } catch (error) {
        console.log(error);
    }
})

module.exports = getBookingsRoute