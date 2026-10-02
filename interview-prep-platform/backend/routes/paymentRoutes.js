const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getMyPurchases,
  getAdminStats,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.get('/my-purchases', protect, getMyPurchases);
router.get('/admin-stats', protect, adminOnly, getAdminStats);

module.exports = router;
