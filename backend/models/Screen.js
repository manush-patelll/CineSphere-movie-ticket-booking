const mongoose = require("mongoose");



const screenSchema = new mongoose.Schema({
    screenName: { type: String },
    seating_capacity: { type: Number },
    seats: { type: [String] },
    amenities: { type: [String] }, // e.g., ["Dolby Atmos", "3D", "Recliner Seats"]
})

module.exports = mongoose.model("Screen", screenSchema);