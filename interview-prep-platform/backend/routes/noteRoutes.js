const express = require('express');
const router = express.Router();
const {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  downloadNotePdf,
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');
const upload = require('../middleware/uploadMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Optional auth middleware for public endpoints to identify logged-in users
const optionalAuth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'interviewprep_super_secret_jwt_key_2026_safe');
        req.user = await User.findById(decoded.id).select('-password');
      } catch (err) {}

      if (!req.user) {
        const decoded = jwt.decode(token);
        if (decoded) {
          const email = decoded.email;
          if (email) {
            req.user = await User.findOne({ email: email.toLowerCase() });
          }
        }
      }
    } catch (e) {}
  }
  next();
};

const noteUploadFields = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'pdf', maxCount: 1 },
]);

router.get('/', optionalAuth, getNotes);
router.get('/:id', optionalAuth, getNoteById);
router.get('/:id/download', protect, downloadNotePdf);

// Admin-only endpoints
router.post('/', protect, adminOnly, noteUploadFields, createNote);
router.put('/:id', protect, adminOnly, noteUploadFields, updateNote);
router.delete('/:id', protect, adminOnly, deleteNote);

module.exports = router;
