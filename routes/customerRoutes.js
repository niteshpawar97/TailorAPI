const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController');

// Get all customers
router.get('/all',  CustomerController.getAllCustomers);

// Create a new customer
router.post('/create',  CustomerController.createCustomer);

// Update an existing customer by ID
router.put('/:id',  CustomerController.updateCustomer);

// Delete a customer by ID
router.delete('/:id', CustomerController.deleteCustomer);

// Add a route to search for a customer by mobile number
router.get('/search/:mobileNumber', CustomerController.searchCustomerByMobile);


module.exports = router;
