const Review = require('../models/Review');
const Service = require('../models/Service');
const Booking = require('../models/Booking');

// @desc    Get reviews for a service
// @route   GET /api/services/:serviceId/reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId }).populate('user', 'name');
    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Add review
// @route   POST /api/reviews
exports.addReview = async (req, res) => {
  try {
    req.body.user = req.user.id;

    // 1. Check if user has a confirmed booking for this service
    const hasBooked = await Booking.findOne({
      user: req.user.id,
      service: req.body.service,
      status: 'confirmed'
    });

    if (!hasBooked && req.user.role !== 'Admin') {
      return res.status(401).json({ 
        success: false, 
        error: 'You must have a confirmed booking to review this service' 
      });
    }

    const review = await Review.create(req.body);
    res.status(201).json({ success: true, data: review });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, error: 'Not found' });

    if (review.user.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    await review.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
