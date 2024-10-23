const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

// User routes
router.post('/', UserController.createUser);       // Create a new user
router.get('/', UserController.getAllUsers);       // Get all users
router.get('/:id', UserController.getUserById);    // Get user by ID
router.put('/:id', UserController.updateUser);      // Update user by ID
router.delete('/:id', UserController.deleteUser);   // Delete user by ID

module.exports = router;
