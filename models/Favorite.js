const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  service: {
    type: mongoose.Schema.ObjectId,
    ref: 'Service',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate favorites (1 user can favorite a service once)
FavoriteSchema.index({ user: 1, service: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', FavoriteSchema);
