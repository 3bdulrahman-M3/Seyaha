const express = require('express');
const { 
  getCompanies, 
  getCompany,
  createCompany, 
  updateCompany,
  updateCompanyStatus, 
  deleteCompany 
} = require('../controllers/companies');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getCompanies)
  .post(protect, authorize('Manager', 'Admin'), createCompany);

router.route('/:id')
  .get(getCompany)
  .put(protect, authorize('Manager', 'Admin'), updateCompany)
  .delete(protect, authorize('Manager', 'Admin'), deleteCompany);

router.route('/:id/status')
  .put(protect, authorize('Admin'), updateCompanyStatus);

module.exports = router;
