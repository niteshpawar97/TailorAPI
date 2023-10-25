// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Get all users
//router.get('/users', UserController.getAllUsers);

// Create a new user
router.post('/add', UserController.createUser);

// Login
router.post('/login', UserController.loginUser);

module.exports = router;
