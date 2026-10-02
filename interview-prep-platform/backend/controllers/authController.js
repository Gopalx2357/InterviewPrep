const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id, email = '', role = 'user') => {
  return jwt.sign(
    { id, email, role },
    process.env.JWT_SECRET || 'interviewprep_super_secret_jwt_key_2026_safe',
    { expiresIn: '30d' }
  );
};

// @desc    Register new user (Always forces role to "user")
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, college } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // SECURITY GUARANTEE: Public registration ALWAYS assigns role: 'user'
    const user = await User.create({
      name,
      officialName: name,
      email: email.toLowerCase(),
      password: hashedPassword,
      college: college || '',
      role: 'user',
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      officialName: user.officialName,
      email: user.email,
      college: user.college,
      role: user.role,
      token: generateToken(user._id, user.email, user.role),
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

// @desc    Login user & get JWT token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || '',
      officialName: user.officialName || user.name,
      token: generateToken(user._id, user.email, user.role),
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching profile', error: error.message });
  }
};

// @desc    Google OAuth Login / Register & get JWT token
// @route   POST /api/auth/google
// @access  Public
const googleLogin = async (req, res) => {
  try {
    const { idToken, email, name, avatar } = req.body;
    let targetEmail = email;
    let targetName = name || 'Google User';

    // Decode ID token if passed and email is missing
    if (idToken && !targetEmail) {
      try {
        const decoded = jwt.decode(idToken);
        if (decoded && decoded.email) {
          targetEmail = decoded.email;
          targetName = decoded.name || targetName;
        }
      } catch (err) {
        console.warn('ID Token decode note:', err.message);
      }
    }

    if (!targetEmail) {
      return res.status(400).json({ message: 'Google Authentication failed. Email is required.' });
    }

    const cleanEmail = targetEmail.toLowerCase().trim();
    const isAdminEmail = cleanEmail === 'gopal.x235@gmail.com';

    // Check if user already exists
    let user = await User.findOne({ email: cleanEmail });

    if (!user) {
      // Create new user with random hashed password
      const randomPass = Math.random().toString(36).slice(-10) + 'GoogleAuth2026!';
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(randomPass, salt);

      user = await User.create({
        name: targetName,
        email: cleanEmail,
        password: hashedPassword,
        role: isAdminEmail ? 'admin' : 'user',
        avatar: avatar || '',
      });
    } else {
      let updated = false;
      if (isAdminEmail && user.role !== 'admin') {
        user.role = 'admin';
        updated = true;
      }
      if (avatar && !user.avatar) {
        user.avatar = avatar;
        updated = true;
      }
      if (updated) {
        await user.save();
      }
    }

    res.json({
      _id: user._id,
      name: user.name,
      officialName: user.officialName || user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || avatar || '',
      token: generateToken(user._id, user.email, user.role),
    });
  } catch (error) {
    console.error('Google Login Error:', error);
    res.status(500).json({ message: 'Server error during Google Login', error: error.message });
  }
};

// @desc    Update current user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {
      name,
      officialName,
      phone,
      avatar,
      gender,
      college,
      gradYear,
      targetRole,
      githubUrl,
      linkedinUrl,
    } = req.body;

    if (name) user.name = name;
    if (officialName !== undefined) user.officialName = officialName;
    if (phone !== undefined) user.phone = phone;
    if (avatar !== undefined) user.avatar = avatar;
    if (gender !== undefined) user.gender = gender;
    if (college !== undefined) user.college = college;
    if (gradYear !== undefined) user.gradYear = gradYear;
    if (targetRole !== undefined) user.targetRole = targetRole;
    if (githubUrl !== undefined) user.githubUrl = githubUrl;
    if (linkedinUrl !== undefined) user.linkedinUrl = linkedinUrl;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      officialName: updatedUser.officialName,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      avatar: updatedUser.avatar,
      gender: updatedUser.gender,
      college: updatedUser.college,
      gradYear: updatedUser.gradYear,
      targetRole: updatedUser.targetRole,
      githubUrl: updatedUser.githubUrl,
      linkedinUrl: updatedUser.linkedinUrl,
    });
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ message: 'Server error updating profile', error: error.message });
  }
};

// @desc    Promote any personal email address to Admin
// @route   POST /api/auth/make-admin
// @access  Public
const makeUserAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Please provide email address to promote to Admin' });
    }

    const targetEmail = email.trim().toLowerCase();
    let user = await User.findOne({ email: targetEmail });

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('AdminPass@12345', salt);
      user = await User.create({
        name: targetEmail.split('@')[0] + ' Admin',
        email: targetEmail,
        password: hashedPassword,
        role: 'admin',
      });
    } else {
      user.role = 'admin';
      await user.save();
    }

    console.log(`[Admin Access Granted] User ${targetEmail} promoted to Admin.`);

    res.json({
      success: true,
      message: `User ${targetEmail} has been promoted to Admin successfully! Notes updation permission granted.`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Make Admin Error:', error);
    res.status(500).json({ message: 'Failed to promote user to Admin', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  getMe,
  updateUserProfile,
  makeUserAdmin,
};
