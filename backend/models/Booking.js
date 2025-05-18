const mongoose = require("mongoose")
const User = require("./User")
const Showtime = require("./Showtimes")
const Screen = require("./Screen")

const BookingSchema = new mongoose.Schema({
    showtime_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtimes', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    screen_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
    seats: { type: [String] },
    total_amount: Number,
    booking_status: {
        type: String,
        enum: ["confirmed", "cancelled", "completed", "failed"],
        default: "confirmed"
    },
    payment_status: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending"
    },
    payment_method: String,
    payment_details: Object,
    transaction_id: String,
    booking_reference: { type: String, unique: true },
    qr_code_url: String
})

module.exports = mongoose.model("Booking", BookingSchema)