const { getConnection } = require('../dbConfig.js');

const CustomerModel = {
  getAllCustomers: (callback) => {
    getConnection()
      .then((connection) => {
        connection.query('SELECT * FROM `customers`', (err, results) => {
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

  createCustomer: (name, address, phone, email, whatsapp, callback) => {
    getConnection()
      .then((connection) => {
        const insertQuery = 'INSERT INTO `customers` (name, address, phone, email, whatsapp) VALUES (?, ?, ?, ?, ?)';
        const values = [name, address, phone, email, whatsapp];
        
        connection.query(insertQuery, values, (err, results) => {
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

  updateCustomer: (customerId, name, address, phone, email, whatsapp, callback) => {
    getConnection()
      .then((connection) => {
        const updateQuery = 'UPDATE `customers` SET name = ?, address = ?, phone = ?, email = ?, whatsapp = ? WHERE id = ?';
        const values = [name, address, phone, email, whatsapp, customerId];
        
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
};

module.exports = CustomerModel;
