require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createAdminAccount = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/interviewprep';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB...');

    const email = process.env.ADMIN_EMAIL || 'admin@interviewprep.com';
    const password = process.env.ADMIN_PASSWORD || 'AdminPass@12345';
    const name = 'Platform Admin';

    if (!email || !password) {
      console.error('ERROR: ADMIN_EMAIL and ADMIN_PASSWORD must be defined in .env');
      process.exit(1);
    }

    const existingAdmin = await User.findOne({ email: email.toLowerCase() });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      existingAdmin.role = 'admin';
      existingAdmin.name = name;
      await existingAdmin.save();
      console.log(`SUCCESS: Existing user ${email} has been updated to ADMIN role with new password.`);
    } else {
      const newAdmin = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'admin',
      });
      console.log(`SUCCESS: Admin account created successfully! Email: ${newAdmin.email}, Role: ${newAdmin.role}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Failed to create admin account:', error.message);
    process.exit(1);
  }
};

createAdminAccount();
