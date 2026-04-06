exports.authorize = (...roles) => {
  return (req, res, next) => {
    // req.user comes from JWT middleware
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role ${req.user.role} not allowed`
      });
    }

    next();
  };
};