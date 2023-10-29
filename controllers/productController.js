// controllers/productController.js
const ProductModel = require("../models/productModel");

const ProductController = {
  getAllProducts: (req, res) => {
    ProductModel.getAllProducts((err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: true, message: "Database error" });
        return;
      }
      res.json({ error: false, message: "Products List", products: results });
    });
  },

  createProduct: (req, res) => {
    // Parse product data from the request body
    const { store_id, name, type, arabic, price, status } = req.body;

    // Call the model to create a new product
    ProductModel.createProduct(
      store_id,
      name,
      type,
      arabic,
      price,
      status,
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: true, message: "Database error" });
          return;
        }
        res.status(201).json(result);
      }
    );
  },

  updateProduct: (req, res) => {
    const productId = req.params.id;
    const { name, type, arabic, price, status } = req.body;

    ProductModel.updateProduct(
      productId,
      name,
      type,
      arabic,
      price,
      status,
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: true, message: "Database error" });
          return;
        }
        res.json({ error: false, message: "Product updated", id: productId });
      }
    );
  },

  deleteProduct: (req, res) => {
    const productId = req.params.id;

    ProductModel.deleteProduct(productId, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: true, message: "Database error" });
        return;
      }
      res.json({ error: false, message: "Product deleted", id: productId });
    });
  },

  searchProductsByStoreAndType: (req, res) => {
    //console.log(req.headers);
    // Retrieve the access token from the request
    const store_id = req.headers.store_id;
    const access_token = req.headers.authorization;
    const { type } = req.query;
    //console.log(store_id);
    ProductModel.searchProductsByStoreAndType(
      store_id,
      type,
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: true, message: "Database error" });
          return;
        }

        // Filter out unwanted properties from each result object
        const filteredResults = results.map((result) => {
          const { status, created_at, updated_at, ...rest } = result;
          return rest;
        });

        res.json({ error: false, message: type, products: filteredResults });
      }
    );
  },
};

module.exports = ProductController;
