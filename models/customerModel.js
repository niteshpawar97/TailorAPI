// models/customerModel.js

const { getConnection } = require('../dbConfig.js');

const CustomerModel = {
  getAllCustomers: (callback) => {
    getConnection()
      .then((connection) => {
        connection.query('SELECT `id`, `store_id`, `name`, `phone`, `whatsapp`, `createtime` FROM `customers` WHERE 1', (err, results) => {
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

  createCustomer: (name, phone, whatsapp, store_id, callback) => {
    getConnection()
      .then((connection) => {
        // Check if a customer with the same phone and store_id already exists
        const checkQuery = 'SELECT id FROM `customers` WHERE `phone` = ? AND `store_id` = ?';
        const checkValues = [phone, store_id];
  
        connection.query(checkQuery, checkValues, (checkErr, checkResults) => {
          if (checkErr) {
            connection.release(); // Release the connection back to the pool
            callback(checkErr.sqlMessage, null);
            return;
          }
  
          if (checkResults.length > 0) {
            // A customer with the same phone and store_id already exists
            connection.release(); // Release the connection back to the pool
            callback(null, {
              error: false,
              id: checkResults[0].id,
              type: 'old',
              message: 'Customer already exists',
            });
          } else {
            // No customer with the same phone and store_id exists, proceed to insert
            const insertQuery = 'INSERT INTO `customers` (name, phone, whatsapp, store_id) VALUES (?, ?, ?, ?)';
            const values = [name, phone, whatsapp, store_id];
  
            connection.query(insertQuery, values, (err, results) => {
              connection.release(); // Release the connection back to the pool
              if (err) {
                callback(err, null);
                return;
              }
              callback(null, {
                error: false,
                id: results.insertId,
                type: 'new',
                message: 'Customer created',
              });
            });
          }
        });
      })
      .catch((err) => {
        callback(err, null);
      });
  },
  

  updateCustomer: (customerId, name, phone, whatsapp, callback) => {
    getConnection()
      .then((connection) => {
        const updateQuery = 'UPDATE `customers` SET name = ?, phone = ?, whatsapp = ? WHERE id = ?';
        const values = [name, phone, whatsapp, customerId];
        
        connection.query(updateQuery, values, (err, results) => {
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

  deleteCustomer: (customerId, callback) => {
    getConnection()
      .then((connection) => {
        const deleteQuery = 'DELETE FROM `customers` WHERE id = ?';
        
        connection.query(deleteQuery, [customerId], (err, results) => {
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

  searchByMobileNumber: (mobileNumber, store_id, callback) => {
    getConnection()
      .then((connection) => {
        const query = 'SELECT * FROM customers WHERE phone LIKE ? and store_id LIKE ?';
        const searchPattern = '%' + mobileNumber + '%';

        connection.query(query, [searchPattern, store_id], (err, results) => {
          connection.release(); // Release the connection back to the pool

          if (err) {
            callback(err, null);
            return;
          }

          callback(null, results); // Return all results that match the search pattern
        });
      })
      .catch((err) => {
        callback(err, null);
      });
  },

};

module.exports = CustomerModel;
