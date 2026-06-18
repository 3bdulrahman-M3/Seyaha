const express = require('express');
const { getUsers, getTourGuides, deleteUser } = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/tour-guides', getTourGuides);

router.use(authorize('Admin'));

router.get('/', getUsers);
router.delete('/:id', deleteUser);

module.exports = router;
