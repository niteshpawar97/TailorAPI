// controllers/shopUserController.js
const ShopUserModel = require('../models/shopUserModel');

const ShopUserController = {
  getAllUsers: (req, res) => {
    ShopUserModel.getAllUsers((err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: true, message: 'Database error' });
        return;
      }
      res.json({ error:false, message: 'Users List', users: results });
      //res.json(results);
    });
  },

  createUser: (req, res) => {
    const { name, username, password } = req.body;
    if (!name || !username || !password) {
      res.status(400).json({ error:  true, message: 'Name, username, and Password are required' });
      return;
    }

    ShopUserModel.createUser(name, username, password, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error:  true, message: 'Database error' });
        return;
      }
      res.status(201).json({ error: false, message: 'User created', id: results.insertId });
    });
  },

  loginUser: (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: true, message: 'Username and Password are required' });
      return;
    }

    ShopUserModel.loginUser(username, password, (err, user) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error:  true, message: 'Database error' });
        return;
      }

      if (!user) {
        res.status(401).json({ error: true, message: 'Invalid credentials' });
        return;
      }

      res.json({ error:false, message: 'Login successful', user });
    });
  },
};


module.exports = ShopUserController;
