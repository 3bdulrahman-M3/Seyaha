const express = require('express');
const { 
  getMyBookings, 
  getCompanyBookings, 
  getBooking, 
  createBooking, 
  updateBookingStatus, 
  cancelBooking,
  getAllBookings
} = require('../controllers/bookings');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

// List APIs (UX Important)
router.get('/my-bookings', getMyBookings);
router.get('/company-bookings', authorize('Manager', 'Admin'), getCompanyBookings);
router.get('/all-bookings', authorize('Admin', 'TourGuide'), getAllBookings);

router.route('/')
  .post(createBooking);

router.route('/:id')
  .get(getBooking)
  .put(authorize('Manager', 'Admin'), updateBookingStatus)
  .delete(cancelBooking);

module.exports = router;
