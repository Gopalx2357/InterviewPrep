const adminOnly = (req, res, next) => {
  const isAdminEmail = req.user && req.user.email && req.user.email.toLowerCase() === 'gopal.x235@gmail.com';
  if (req.user && (req.user.role === 'admin' || isAdminEmail)) {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied: Admin privileges required' });
  }
};

module.exports = { adminOnly };
