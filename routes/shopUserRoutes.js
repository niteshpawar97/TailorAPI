// routes/shopUserRoutes.js
const express = require('express');
const router = express.Router();
const ShopUserController = require('../controllers/shopUserController');

router.get('/users', ShopUserController.getAllUsers);
router.post('/register', ShopUserController.createUser);
router.post('/login', ShopUserController.loginUser);

module.exports = router;
