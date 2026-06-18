const User = require('../models/User');

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'Admin' });

    if (!adminExists) {
      console.log('🚀 No Admin found. Creating default admin...');
      
      await User.create({
        name: 'Super Admin',
        email: 'admin@seyaha.com',
        password: 'admin123456',
        role: 'Admin'
      });

      console.log('✅ Default Admin created: admin@seyaha.com / admin123456');
    } else {
      console.log('ℹ️ Admin already exists in database.');
    }
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
  }
};

module.exports = seedAdmin;
