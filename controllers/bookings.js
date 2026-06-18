const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Company = require('../models/Company');

// @desc    Get user bookings
// @route   GET /api/bookings/my-bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('service tourGuide');
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get all bookings (Admin/TourGuide)
// @route   GET /api/bookings/all-bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user service tourGuide');
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get company bookings (Manager)
// @route   GET /api/bookings/company-bookings
exports.getCompanyBookings = async (req, res) => {
  try {
    const companies = await Company.find({ owner: req.user.id });
    const companyIds = companies.map(c => c._id);
    const services = await Service.find({ company: { $in: companyIds } });
    const serviceIds = services.map(s => s._id);
    
    const bookings = await Booking.find({ service: { $in: serviceIds } }).populate('user service tourGuide');
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user service tourGuide');
    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });
    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create booking request
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const booking = await Booking.create(req.body);
    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update booking status (State Machine logic)
// @route   PUT /api/bookings/:id
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    let booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });

    const validTransitions = {
      'pending': ['confirmed', 'rejected', 'cancelled'],
      'confirmed': ['completed', 'cancelled'],
      'rejected': [],
      'cancelled': [],
      'completed': []
    };

    if (!validTransitions[booking.status].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        error: `Cannot change status from ${booking.status} to ${status}` 
      });
    }

    booking.status = status;
    await booking.save();
    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });

    if (booking.user.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    booking.status = 'cancelled';
    await booking.save();
    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
