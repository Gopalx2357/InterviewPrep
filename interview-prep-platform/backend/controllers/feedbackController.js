const Feedback = require('../models/Feedback');

// @desc    Add review / feedback
// @route   POST /api/feedback
// @access  Private
const addFeedback = async (req, res) => {
  try {
    const { rating, comment, targetType, targetId } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating and comment are required' });
    }

    const feedback = await Feedback.create({
      userId: req.user._id,
      userName: req.user.name,
      rating: Number(rating),
      comment,
      targetType: targetType || 'platform',
      targetId: targetId || null,
    });

    res.status(201).json(feedback);
  } catch (error) {
    console.error('Error adding feedback:', error);
    res.status(500).json({ message: 'Failed to submit review', error: error.message });
  }
};

// @desc    Get feedbacks / reviews
// @route   GET /api/feedback
// @access  Public
const getFeedbacks = async (req, res) => {
  try {
    const { targetType, targetId } = req.query;
    let query = {};

    if (targetType) query.targetType = targetType;
    if (targetId) query.targetId = targetId;

    const feedbacks = await Feedback.find(query).sort({ createdAt: -1 }).limit(20);
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
};

module.exports = {
  addFeedback,
  getFeedbacks,
};
