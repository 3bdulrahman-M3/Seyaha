const Favorite = require('../models/Favorite');

// @desc    Get user favorites
// @route   GET /api/favorites
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id }).populate('service');
    res.status(200).json({ success: true, count: favorites.length, data: favorites });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Add to favorites
// @route   POST /api/favorites/:serviceId
exports.addFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.create({
      user: req.user.id,
      service: req.params.serviceId
    });
    res.status(201).json({ success: true, data: favorite });
  } catch (err) {
    res.status(400).json({ success: false, error: 'Already favorited or error' });
  }
};

// @desc    Remove from favorites
// @route   DELETE /api/favorites/:serviceId
exports.removeFavorite = async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      user: req.user.id,
      service: req.params.serviceId
    });
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
