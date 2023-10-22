// controllers/userController.js
const UserModel = require("../models/userModel");

const UserController = {
  getAllUsers: (req, res) => {
    UserModel.getAllUsers((err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: true, message: "Database error" });
        return;
      }
      res.json({ error: false, message: "Users List", users: results });
    });
  },

  createUser: (req, res) => {
    const { c_role, c_username, c_password, accesstoken } = req.body;

    // Check if the 'accesstoken' is provided in the request
    if (!accesstoken) {
      res.status(400).json({ error: true, message: 'Access Token is required' });
      return;
    }

    // Check the role of the user with the provided 'accesstoken'
    UserModel.getUserRoleByAccessToken(accesstoken, (err, userRole) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: true, message: 'Database error' });
        return;
      }

      if (userRole === 'superadmin') {
        // The user has 'superadmin' role, proceed with user creation
        if ( !c_role || !c_username || !c_password) {
          res.status(400).json({ error: true, message: 'Create Client role, username, and password are required' });
          return;
        }

        // Generate store_id and accesstoken using UserModel functions
        const c_store_id = UserModel.generateStoreID();
        const c_accesstoken = UserModel.generateAccessToken();

        UserModel.createUser(c_store_id, c_role, c_username, c_password, c_accesstoken, (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: true, message: 'Database error' });
            return;
          }
          res.status(201).json({ error: false, message: 'User Client created', id: results.insertId });
        });
      } else {
        // User does not have 'superadmin' role, permission denied
        res.status(403).json({ error: true, message: 'Permission denied' });
      }
    });
  },

  loginUser: (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res
        .status(400)
        .json({ error: true, message: "Username and Password are required" });
      return;
    }

    UserModel.loginUser(username, password, (err, user) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: true, message: "Database error" });
        return;
      }

      if (!user) {
        res.status(401).json({ error: true, message: "Invalid credentials" });
        return;
      }

      // Create a new object with user data, excluding 'password_hash'
      const sanitizedUser = { ...user };
      delete sanitizedUser.password_hash;

      res.json({
        error: false,
        message: "Login successful",
        user: sanitizedUser,
      });
    });
  },
};

module.exports = UserController;
