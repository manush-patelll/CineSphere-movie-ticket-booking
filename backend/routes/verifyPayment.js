const sendBookingPDFEmail = require("../controller/ticketConfirmaitionController");
const Booking = require("../models/Booking");
const Showtimes = require("../models/Showtimes");
const crypto = require("crypto");
const express = require("express");
const verifyPaymentRoute = express.Router();

const key_secret = process.env.RAZORPAY_SECRET;

function verifySignature(order_id, payment_id, signature, secret) {
    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(order_id + "|" + payment_id)
        .digest("hex");
    return expectedSignature === signature;
}

verifyPaymentRoute.post("/", async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        showtime_id,
        screen_id,
        user_id,
        seats,
        total_amount,
    } = req.body;

    const isValid = verifySignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        key_secret
    );

    if (!isValid) {
        return res.status(400).json({ error: "Invalid payment signature" });
    }

    try {
        // Step 1: Find the showtime
        const showtime = await Showtimes.findById(showtime_id);
        if (!showtime) return res.status(404).json({ error: "Showtime not found" });

        // Step 2: Check for already booked seats
        const conflict = seats.some(seat => showtime.bookedSeats.includes(seat));
        if (conflict) {
            return res.status(409).json({ error: "One or more seats already booked" });
        }

        // Step 3: Push new seats to bookedSeats
        await Showtimes.findByIdAndUpdate(showtime_id, {
            $push: { bookedSeats: { $each: seats } },
        });

        // Step 4: Create booking
        const booking = await Booking.create({
            showtime_id,
            user_id,
            screen_id,
            seats,
            total_amount,
            payment_status: "completed",
            payment_method: "razorpay",
            payment_details: {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            },
            transaction_id: razorpay_payment_id,
            booking_reference: "BOOK-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
        });

        // console.log("this is booking", booking)

        const bookingDetails = await Booking.find({ _id: booking._id }, { user_id: 1, screen_id: 1, showtime_id: 1, seats: 1, total_amount: 1, booking_reference: 1 }).populate("user_id", "email").populate("screen_id", "screenName").populate({
            path: "showtime_id",
            populate: {
                path: "movie_id",
                model: "Movie", // <-- Correct model name here
                select: "title" // <-- Select only title field from Movie
            }
        });

        console.log("This is booking details", bookingDetails)
        sendBookingPDFEmail(bookingDetails[0])

        res.status(200).json({ message: "Booking successful", booking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = verifyPaymentRoute;
