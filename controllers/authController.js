// controllers/shopUserController.js
const ShopUserModel = require('../models/shopUserModel');

const ShopUserController = {
  getAllUsers: (req, res) => {
    ShopUserModel.getAllUsers((err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json(results);
    });
  },

  createUser: (req, res) => {
    const { name, username, password } = req.body;
    if (!name || !username || !password) {
      res.status(400).json({ error: 'Name, username, and Password are required' });
      return;
    }

    ShopUserModel.createUser(name, username, password, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.status(201).json({ message: 'User created', id: results.insertId });
    });
  },
};

module.exports = ShopUserController;
