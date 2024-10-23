// middleware/authorize.js
const authorize = (roles = []) => {
  // roles param can be a single role string (e.g. 'admin') or an array of roles (e.g. ['admin', 'user'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).send('Access Denied: You do not have the right permissions.');
    }
    next();
  };
};

module.exports = authorize;
