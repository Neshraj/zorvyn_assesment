const express = require('express');
const router = express.Router();
const { protect } = require('../../common/middleware common/auth.middleware');
const { authorize } = require('../../common/middleware common/role.middleware');

// 🔹 Anyone logged in
router.get('/profile', protect, (req, res) => {
  res.json({
    success: true,
    message: 'Protected route accessed',
    user: req.user
  });
});

// 🔹 Only ADMIN
router.get('/admin', protect, authorize('ADMIN'), (req, res) => {
  res.json({
    success: true,
    message: 'Welcome Admin'
  });
});

// 🔹 ADMIN + ANALYST
router.get('/analytics', protect, authorize('ADMIN', 'ANALYST'), (req, res) => {
  res.json({
    success: true,
    message: 'Analytics data'
  });
});

module.exports = router;