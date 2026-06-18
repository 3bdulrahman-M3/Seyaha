const mongoose = require('mongoose');
const seedAdmin = require('../utils/seeder');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      family: 4,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Seed default admin
    await seedAdmin();
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    if (error.message.includes('ECONNREFUSED')) {
      console.error('👉 Tip: Check if your IP address is whitelisted in MongoDB Atlas (Network Access).');
    }
    process.exit(1);
  }
};

module.exports = connectDB;
