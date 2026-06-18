const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true, index: true },
  service: { type: mongoose.Schema.ObjectId, ref: 'Service', required: true, index: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected', 'cancelled', 'completed'],
    default: 'pending'
  },
  dates: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  notes: String,
  totalPrice: Number,
  tourGuide: { type: mongoose.Schema.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
