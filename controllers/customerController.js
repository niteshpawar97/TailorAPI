const CustomerModel = require("../models/customerModel");
const UserModel = require("../models/userModel");
const dvMiddleware = require("../middleware/dataValidation");

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

  createCustomer: [
    dvMiddleware.validCustomerField,
    (req, res) => {
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
            // Proceed to create the customer
            CustomerModel.createCustomer(
              name,
              phone,
              whatsapp,
              storeId,
              (err, result) => {
                if (err) {
                  console.error(err);
                  res.status(500).json({ error: true, message: "Database error" });
                  return;
                }
                if (result.error === false) {
                  // Customer was successfully created
                  res.status(201).json(result);
                } else {
                  // Customer with the same phone and store_id already exists
                  res.status(200).json(result);
                }
              }
            );
          } else {
            res.status(403).json({ error: true, message: "Permission denied" });
          }
        }
      );
    },
  ],

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

  searchCustomerByMobile: [ dvMiddleware.validPhoneField, (req, res) => {
    const mobileNumber = req.params.mobileNumber;

    // Handle the search by mobile number
    CustomerModel.searchByMobileNumber(mobileNumber, (err, customer) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: true, message: "Database error" });
        return;
      }

      if (!customer) {
        res.status(404).json({ error: true, message: "Customer not found" });
        return;
      }

      res.json({ error: false, customer });
    });
  }
  ],
};

module.exports = CustomerController;
