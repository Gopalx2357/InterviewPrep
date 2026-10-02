const express = require('express');
const router = express.Router();
const {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  downloadCompanyResources,
} = require('../controllers/companyController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');
const upload = require('../middleware/uploadMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

const companyUploadFields = upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'resource', maxCount: 1 },
]);

router.get('/', optionalAuth, getCompanies);
router.get('/:id', optionalAuth, getCompanyById);
router.get('/:id/download', protect, downloadCompanyResources);

// Admin routes
router.post('/', protect, adminOnly, companyUploadFields, createCompany);
router.put('/:id', protect, adminOnly, companyUploadFields, updateCompany);
router.delete('/:id', protect, adminOnly, deleteCompany);

module.exports = router;
