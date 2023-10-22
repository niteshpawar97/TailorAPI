const { getConnection } = require("../dbConfig.js");

const UserModel = {
  getAllUsers: (callback) => {
    getConnection()
      .then((connection) => {
        connection.query("SELECT * FROM users", (err, results) => {
          connection.release(); // Release the connection back to the pool
          if (err) {
            callback(err, null);
            return;
          }
          callback(null, results);
        });
      })
      .catch((err) => {
        callback(err, null);
      });
  },

  createUser: (c_store_id, c_role, c_username, c_password, c_accesstoken, callback) => {
    getConnection()
      .then((connection) => {
        const c_n_store_id = (c_username + c_store_id);
        const query =
          "INSERT INTO users (store_id, role, username, password_hash, accesstoken) VALUES (?, ?, ?, ?, ?)";
        connection.query(
          query,
          [c_n_store_id, c_role, c_username, c_password, c_accesstoken],
          (err, results) => {
            connection.release(); // Release the connection back to the pool
            if (err) {
              callback(err, null);
              return;
            }
            callback(null, results);
          }
        );
      })
      .catch((err) => {
        callback(err, null);
      });
  },

  loginUser: (username, password, callback) => {
    getConnection()
      .then((connection) => {
        const query =
          "SELECT * FROM users WHERE username = ? AND password_hash = ?";
        connection.query(query, [username, password], (err, results) => {
          connection.release(); // Release the connection back to the pool
          if (err) {
            callback(err, null);
            return;
          }

          if (results.length === 0) {
            callback(null, null);
          } else {
            callback(null, results[0]);
          }
        });
      })
      .catch((err) => {
        callback(err, null);
      });
  },

  getUserRoleByAccessToken: (accesstoken, callback) => {
    getConnection()
      .then((connection) => {
        // Query the database to get the user's role based on the provided accesstoken
        const query = 'SELECT `role` FROM `users` WHERE `accesstoken` = ?';
        connection.query(query, [accesstoken], (err, results) => {
          connection.release(); // Release the connection back to the pool

          if (err) {
            callback(err, null);
            return;
          }

          if (results.length === 0) {
            // Access token not found, user doesn't exist
            callback(null, null);
          } else {
            const userRole = results[0].role;
            callback(null, userRole);
          }
        });
      })
      .catch((err) => {
        callback(err, null);
      });
  },

  getUserRoleAndStoreIdByAccessToken: (accesstoken, callback) => {
    getConnection()
      .then((connection) => {
        // Query the database to get the user's role and store_id based on the provided accesstoken
        const query = 'SELECT `role`, `store_id` FROM `users` WHERE `accesstoken` = ?';
        connection.query(query, [accesstoken], (err, results) => {
          connection.release(); // Release the connection back to the pool

          if (err) {
            callback(err, null, null);
            return;
          }

          if (results.length === 0) {
            // Access token not found, user doesn't exist
            callback(null, null, null);
          } else {
            const userRole = results[0].role;
            const storeId = results[0].store_id;
            callback(null, userRole, storeId);
          }
        });
      })
      .catch((err) => {
        callback(err, null, null);
      });
  },



  generateStoreID: () => {
    // Generate a random alphanumeric store_id
    const characters =
      "0123456789";
    const length = 5;
    let storeID = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      storeID += characters.charAt(randomIndex);
    }
    return storeID;
  },

  generateAccessToken: () => {
    // Generate and return an accesstoken
    // Generate a random alphanumeric access token
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 32; // You can adjust the length as needed
    let accessToken = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      accessToken += characters.charAt(randomIndex);
    }
    return accessToken;
  },
};

module.exports = UserModel;
