// routes/shopUserRoutes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.get('/', AuthController.getAllUsers);
router.post('/', AuthController.createUser);

module.exports = router;
