const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
    seatNumber: { type: String, required: true, unique: true },
    isBooked: { type: Boolean, default: false }
});

module.exports = mongoose.model('Seat', SeatSchema);
