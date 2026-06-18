const express = require('express');
const { 
  getServices, 
  getService, 
  createService, 
  updateService, 
  deleteService 
} = require('../controllers/services');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Re-route into other resource routers
const reviewRouter = require('./reviews');
router.use('/:serviceId/reviews', reviewRouter);

router.route('/')
  .get(getServices)
  .post(protect, authorize('Manager', 'Admin'), createService);

router.route('/:id')
  .get(getService)
  .put(protect, authorize('Manager', 'Admin'), updateService)
  .delete(protect, authorize('Manager', 'Admin'), deleteService);

module.exports = router;
