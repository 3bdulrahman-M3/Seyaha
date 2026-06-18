const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true // Indexing for fast lookup
  },
  password: { type: String, required: true, select: false },
  role: { 
    type: String, 
    enum: ['User', 'Manager', 'Admin', 'TourGuide'], 
    default: 'User' 
  },
  createdAt: { type: Date, default: Date.now },
  resetPasswordOTP: String,
  resetPasswordOTPExpire: Date
});

UserSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
