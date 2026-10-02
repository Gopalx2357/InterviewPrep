const express = require('express');
const router = express.Router();
const { addFeedback, getFeedbacks } = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addFeedback);
router.get('/', getFeedbacks);

module.exports = router;
