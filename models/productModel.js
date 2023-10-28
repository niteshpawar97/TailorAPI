const { getConnection } = require('../dbConfig.js');

const ProductModel = {
  getAllProducts: (callback) => {
    getConnection()
      .then((connection) => {
        connection.query('SELECT `id`, `store_id`, `name`, `type`, `arabic`, `price`, `status`, `created_at`, `updated_at` FROM `products`', (err, results) => {
          connection.release();
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

  createProduct: (store_id, name, type, arabic, price, status, callback) => {
    getConnection()
      .then((connection) => {
        const insertQuery = 'INSERT INTO `products` (store_id, name, type, arabic, price, status) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [store_id, name, type, arabic, price, status];

        connection.query(insertQuery, values, (err, result) => {
          connection.release();
          if (err) {
            callback(err, null);
            return;
          }
          callback(null, {
            error: false,
            id: result.insertId,
            message: 'Product created',
          });
        });
      })
      .catch((err) => {
        callback(err, null);
      });
  },

  updateProduct: (productId, name, type, arabic, price, status, callback) => {
    getConnection()
      .then((connection) => {
        const updateQuery = 'UPDATE `products` SET name = ?, type = ?, arabic = ?, price = ?, status = ? WHERE id = ?';
        const values = [name, type, arabic, price, status, productId];

        connection.query(updateQuery, values, (err, results) => {
          connection.release();
          if (err) {
            callback(err, null);
            return;
          }
          callback(null, {
            error: false,
            message: 'Product updated',
          });
        });
      })
      .catch((err) => {
        callback(err, null);
      });
  },

  deleteProduct: (productId, callback) => {
    getConnection()
      .then((connection) => {
        const deleteQuery = 'DELETE FROM `products` WHERE id = ?';
        
        connection.query(deleteQuery, [productId], (err, results) => {
          connection.release();
          if (err) {
            callback(err, null);
            return;
          }
          callback(null, {
            error: false,
            message: 'Product deleted',
          });
        });
      })
      .catch((err) => {
        callback(err, null);
      });
  },

  searchProductsByStoreAndType: (store_id, type, callback) => {
    getConnection()
      .then((connection) => {
        const query = 'SELECT * FROM products WHERE store_id = ? AND type = ? AND status = 1';
        
        connection.query(query, [store_id, type], (err, results) => {
          connection.release();
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

module.exports = ProductModel;
