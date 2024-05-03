const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user,admin,vendor
router.post('/create', userController.createUser);

// login user, admin, vendor
router.post('/login', userController.login);

// Get all users
router.get('/list', userController.getAllUsers);

// Get a single user by ID
router.get('/users/:id', userController.getUserById);

// Delete a user by ID
router.delete('/users/:id', userController.deleteUserById);

module.exports = router;