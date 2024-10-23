// routes/authRoutes.js
const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// Authentication routes
router.post('/register', AuthController.register);  // Register a new user
router.post('/login', AuthController.login);        // User login

module.exports = router;
