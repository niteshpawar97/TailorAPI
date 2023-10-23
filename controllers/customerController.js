const CustomerModel = require("../models/customerModel");
const UserModel = require("../models/userModel");

const CustomerController = {
  getAllCustomers: (req, res) => {
    CustomerModel.getAllCustomers((err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: true, message: "Database error" });
        return;
      }
      res.json({ error: false, message: "Customers List", customers: results });
    });
  },

  createCustomer: (req, res) => {
    const { name, phone, whatsapp } = req.body;

    // Retrieve the access token from the request
    const accessToken = req.headers.authorization; // You may need to adjust this based on how access tokens are passed in your requests.

    // Use the access token to get the user's role and store_id
    UserModel.getUserRoleAndStoreIdByAccessToken(
      accessToken,
      (err, userRole, storeId) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: true, message: "Database error" });
          return;
        }

        // Check if the user has the 'client' role and a valid store_id
        if (userRole === "client" && storeId) {
          if (!name || !phone || !whatsapp) {
            res
              .status(400)
              .json({
                error: true,
                message: "Name, phone, and whatsapp are required",
              });
            return;
          }

          // Proceed to create the customer
          CustomerModel.createCustomer(
            name,
            phone,
            whatsapp,
            storeId,
            (err, results) => {
              if (err) {
                console.error(err);
                res
                  .status(500)
                  .json({ error: true, message: "Database error" });
                return;
              }
              res
                .status(201)
                .json({
                  error: false,
                  message: "Customer created",
                  id: results.insertId,
                });
            }
          );
        } else {
          res.status(403).json({ error: true, message: "Permission denied" });
        }
      }
    );
  },

  updateCustomer: (req, res) => {
    const customerId = req.params.id;
    const { name, phone, whatsapp } = req.body;

    CustomerModel.updateCustomer(
      customerId,
      name,
      phone,
      whatsapp,
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: true, message: "Database error" });
          return;
        }
        res.json({ error: false, message: "Customer updated", id: customerId });
      }
    );
  },

  deleteCustomer: (req, res) => {
    const customerId = req.params.id;

    CustomerModel.deleteCustomer(customerId, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: true, message: "Database error" });
        return;
      }
      res.json({ error: false, message: "Customer deleted", id: customerId });
    });
  },


  searchCustomerByMobile: (req, res) => {
    const mobileNumber = req.params.mobileNumber;

    // Handle the search by mobile number
    CustomerModel.searchByMobileNumber(mobileNumber, (err, customer) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: true, message: 'Database error' });
        return;
      }

      if (!customer) {
        res.status(404).json({ error: true, message: 'Customer not found' });
        return;
      }

      res.json({ error: false, customer });
    });
  },

  
};

module.exports = CustomerController;
