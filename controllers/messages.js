const Message = require('../models/Message');

// @desc    Get messages for a booking
// @route   GET /api/messages/:bookingId
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ booking: req.params.bookingId }).populate('sender', 'name');
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Send message
// @route   POST /api/messages
exports.sendMessage = async (req, res) => {
  try {
    req.body.sender = req.user.id;
    const message = await Message.create(req.body);
    res.status(201).json({ success: true, data: message });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
