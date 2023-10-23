````markdown
# TailorApp API Documentation

This documentation provides information on how to use the endpoints of the TailorApp API.

````
## How to run Node Sever and run Code autorun

  sudo su root
  cd ../
  cd niketgroup-soft/htdocs/soft.niketgroup.in/api
  pm2 start app.js --name tailor


## Authentication

Before using any of the endpoints, you need to authenticate. You can do this by sending a POST request to `/api/login` with the following JSON data:

```json
{
  "username": "nitesh",
  "password": "1234"
}
```
````

- **Endpoint:** `/api/login`
- **Method:** POST
- **Request Body:**
  - `username` (string) - The username for authentication.
  - `password` (string) - The password for authentication.
- **Response:**
  - Include details about the response as needed.

## Add a Customer

To add a new customer, send a POST request to `/api/customer/create` with the following JSON data:

```json
{ "name": "rajsh pawar", "phone": "9988007766", "whatsapp": "9988007766" }
```

- **Headers:** `Authorization: 'client-accesstoken'`
- **Endpoint:** `/api/customer/create`
- **Method:** POST
- **Request Body:**
  - `name` (string) - The customer's name.
  - `phone` (string) - The customer's phone number.
  - `whatsapp` (string) - The customer's WhatsApp number.
- **Response:**
  - Include details about the response as needed.

## Update a Customer

To update a customer's information, send a PUT request to `/api/customer/{customerId}` with the following JSON data:

```json
{ "name": "rajsh pawar", "phone": "9988007766", "whatsapp": "9988007766" }
```

- **Headers:** `Authorization: 'client-accesstoken'`
- **Endpoint:** `/api/customer/{customerId}`
- **Method:** PUT
- **URL Parameter:**
  - `customerId` (integer) - The ID of the customer to update.
- **Request Body:**
  - `name` (string) - The customer's name.
  - `phone` (string) - The customer's phone number.
  - `whatsapp` (string) - The customer's WhatsApp number.
  - `address` (string) - The customer's address.
  - `email` (string) - The customer's email.
- **Response:**
  - Include details about the response as needed.

## Show All Customers

To retrieve a list of all customers, send a GET request to `/api/customer/all`.

- **Headers:** `Authorization: 'client-accesstoken'`
- **Endpoint:** `/api/customer/all`
- **Method:** GET
- **Response:** Customers list in JSON format.

```json
{
  "error": false,
  "message": "Customers List",
  "customers": [
    {
      "id": 1,
      "store_id": "niket1234",
      "name": "John Doe",
      "phone": "555-123-4567",
      "whatsapp": "555-987-6543",
      "createtime": "2023-10-21T13:27:51.000Z"
    },
    {
      "id": 2,
      "store_id": "niket1234",
      "name": "Jane Smith",
      "phone": "555-555-5555",
      "whatsapp": "555-111-2222",
      "createtime": "2023-10-21T13:27:51.000Z"
    },
  ]
}
```

## Delete a Customer

To delete a customer, send a DELETE request to `/api/customer/{customerId}`.

- **Headers:** `Authorization: 'client-accesstoken'`
- **Endpoint:** `/api/customer/{customerId}`
- **Method:** DELETE
- **URL Parameter:**
  - `customerId` (integer) - The ID of the customer to delete.

Include additional details and explanations as needed in your `README.md` to make the documentation clear and comprehensive.

```

```
