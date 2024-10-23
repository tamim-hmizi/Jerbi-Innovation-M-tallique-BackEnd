// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).send('Access Denied: No token provided.');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Access Denied: Invalid token.');
    }

    req.user = user; // Store user info in request
    next();
  });
};

module.exports = authenticateJWT;
