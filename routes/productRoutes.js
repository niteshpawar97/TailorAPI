// routes/productRouter.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// Get all products
router.get('/', ProductController.getAllProducts);

// Create a new product
router.post('/', ProductController.createProduct);

// Update an existing product by ID
router.put('/:id', ProductController.updateProduct);

// Delete a product by ID
router.delete('/:id', ProductController.deleteProduct);

// Search for products by store_id and type
router.get('/search', ProductController.searchProductsByStoreAndType);

module.exports = router;
