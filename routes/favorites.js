const express = require('express');
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favorites');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getFavorites);

router.route('/:serviceId')
  .post(addFavorite)
  .delete(removeFavorite);

module.exports = router;
