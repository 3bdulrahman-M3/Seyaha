const express = require('express');
const { register, login, getMe, updateDetails, forgotPassword, verifyOTP, resetPassword } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.post('/forgotpassword', forgotPassword);
router.post('/verifyotp', verifyOTP);
router.put('/resetpassword', resetPassword);

module.exports = router;
