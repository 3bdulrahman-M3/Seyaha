const express = require('express');
const { getMessages, sendMessage } = require('../controllers/messages');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/:bookingId', getMessages);
router.post('/', sendMessage);

module.exports = router;
