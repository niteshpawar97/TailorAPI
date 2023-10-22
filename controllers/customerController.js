const CustomerModel = require('../models/customerModel'); // Import the customer model

const CustomerController = {
  getAllCustomers: (req, res) => {
    CustomerModel.getAllCustomers((err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: true, message: 'Database error' });
        return;
      }
      res.json({ error: false, message: 'Customers List', customers: results });
    });
  },

  createCustomer: (req, res) => {
    const { name, address, phone, email, whatsapp } = req.body;
    if (!name) {
      res.status(400).json({ error: true, message: 'Name is required' });
      return;
    }

    CustomerModel.createCustomer(name, address, phone, email, whatsapp, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: true, message: 'Database error' });
        return;
      }
      res.status(201).json({ error: false, message: 'Customer created', id: results.insertId });
    });
  },

  updateCustomer: (req, res) => {
    const customerId = req.params.id;
    const { name, address, phone, email, whatsapp } = req.body;

    if (!name && !phone && !whatsapp) {
      res.status(400).json({ error: true, message: 'Name is required' });
      return;
    }

    CustomerModel.updateCustomer(customerId, name, address, phone, email, whatsapp, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: true, message: 'Database error' });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: true, message: 'Customer not found' });
      } else {
        res.json({ error: false, message: 'Customer updated successfully' });
      }
    });
  },

  deleteCustomer: (req, res) => {
    const customerId = req.params.id;

    CustomerModel.deleteCustomer(customerId, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: true, message: 'Database error' });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: true, message: 'Customer not found' });
      } else {
        res.status(204).json({ error: true, message: 'Customer data delete' });
      }
    });
  },
};

module.exports = CustomerController;
