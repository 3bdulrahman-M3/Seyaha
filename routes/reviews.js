const express = require('express');
const { getReviews, addReview, deleteReview } = require('../controllers/reviews');
const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(getReviews)
  .post(protect, addReview);

router.route('/:id')
  .delete(protect, deleteReview);

module.exports = router;
