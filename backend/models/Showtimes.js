const mongoose = require("mongoose")

const ShowtimeSchema = new mongoose.Schema({
    movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    screen_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
    start_time: { type: Date },
    end_time: { type: Date },
    date: { type: Date },
    bookedSeats: { type: [String] },
    is_active: { type: Boolean },
})

module.exports = mongoose.model("Showtimes", ShowtimeSchema);