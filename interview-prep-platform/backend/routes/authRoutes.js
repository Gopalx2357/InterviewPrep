const express = require('express');
const router = express.Router();
const { registerUser, loginUser, googleLogin, getMe, updateUserProfile, makeUserAdmin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);
router.post('/make-admin', makeUserAdmin);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
