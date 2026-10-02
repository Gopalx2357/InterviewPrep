const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];

    if (!token || token === 'undefined' || token === 'null') {
      return res.status(401).json({ message: 'Not authorized, token missing.' });
    }

    // 1. Try verify with Express JWT Secret
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'interviewprep_super_secret_jwt_key_2026_safe'
      );
      let user = null;
      if (decoded.id) {
        try {
          user = await User.findById(decoded.id).select('-password');
        } catch (e) {}
      }
      if (!user && decoded.email) {
        user = await User.findOne({ email: decoded.email.toLowerCase() }).select('-password');
      }
      if (user) {
        const isAdminEmail = user.email && user.email.toLowerCase() === 'gopal.x235@gmail.com';
        if (isAdminEmail) {
          user.role = 'admin';
        }
        req.user = user;
        return next();
      }

      // If token is legitimately signed HMAC JWT but user record was in previous in-memory DB:
      if (!user && (decoded.id || decoded.email)) {
        const userEmail = decoded.email || (decoded.role === 'admin' ? 'gopal.x235@gmail.com' : `user_${String(decoded.id).slice(-6)}@interviewprep.dev`);
        const isAdminEmail = userEmail.toLowerCase() === 'gopal.x235@gmail.com' || decoded.role === 'admin';
        try {
          user = await User.findOne({ email: userEmail.toLowerCase() });
          if (!user) {
            user = await User.create({
              name: decoded.name || (isAdminEmail ? 'Admin Gopal' : 'Student Candidate'),
              officialName: decoded.name || (isAdminEmail ? 'Admin Gopal' : 'Student Candidate'),
              email: userEmail.toLowerCase(),
              password: 'OAUTH_SAFE_RESTORED_USER',
              role: isAdminEmail ? 'admin' : (decoded.role || 'user'),
            });
          }
          req.user = user;
          return next();
        } catch (createErr) {
          user = await User.findOne({ email: userEmail.toLowerCase() });
          if (user) {
            req.user = user;
            return next();
          }
        }
      }
    } catch (err) {
      // Not an Express HMAC token, fall through to decoded Firebase token
    }

    // 2. Decode Firebase ID Token or Google OAuth Token
    try {
      const decoded = jwt.decode(token);
      if (decoded) {
        const email = decoded.email || decoded.firebase?.identities?.email?.[0];
        const uid = decoded.user_id || decoded.uid || decoded.sub || decoded.id;
        const isAdminEmail = email && email.toLowerCase() === 'gopal.x235@gmail.com';

        let user = null;
        if (email) {
          user = await User.findOne({ email: email.toLowerCase() });
        }
        if (!user && uid) {
          try {
            user = await User.findById(uid);
          } catch (e) {}
        }

        // If user logged in via Firebase/Google but not in MongoDB, create record
        if (!user && email) {
          try {
            user = await User.create({
              name: decoded.name || email.split('@')[0],
              officialName: decoded.name || email.split('@')[0],
              email: email.toLowerCase(),
              password: 'OAUTH_FIREBASE_USER_SAFE',
              role: isAdminEmail ? 'admin' : 'user',
              avatar: decoded.picture || '',
            });
          } catch (createErr) {
            user = await User.findOne({ email: email.toLowerCase() });
          }
        }

        if (user) {
          if (isAdminEmail) {
            user.role = 'admin';
          }
          req.user = user;
          return next();
        }
      }
    } catch (fallbackErr) {
      console.error('Fallback token decode error:', fallbackErr.message);
    }
  }

  return res.status(401).json({ message: 'Not authorized, please sign in.' });
};

module.exports = { protect };
