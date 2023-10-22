
```markdown
# TailorApp API Documentation

This documentation provides information on how to use the endpoints of the TailorApp API.

## Authentication

Before using any of the endpoints, you need to authenticate. You can do this by sending a POST request to `/api/login` with the following JSON data:

```json
{
  "username": "nitesh",
  "password": "1234"
}
```

- **Endpoint:** `/api/login`
- **Method:** POST
- **Request Body:**
  - `username` (string) - The username for authentication.
  - `password` (string) - The password for authentication.
- **Response:**
  - Include details about the response as needed.

## Add a Customer

To add a new customer, send a POST request to `/api/customer/add` with the following JSON data:

```json
{
  "name": "rajesh pawar",
  "phone": "1234567890",
  "whatsapp": "1234567890",
  "address": "CWA, IND",
  "email": "rj@gmail.com"
}
```

- **Endpoint:** `/api/customer/add`
- **Method:** POST
- **Request Body:**
  - `name` (string) - The customer's name.
  - `phone` (string) - The customer's phone number.
  - `whatsapp` (string) - The customer's WhatsApp number.
  - `address` (string) - The customer's address.
  - `email` (string) - The customer's email.
- **Response:**
  - Include details about the response as needed.

## Update a Customer

To update a customer's information, send a PUT request to `/api/customer/{customerId}` with the following JSON data:

```json
{
  "name": "rajesh pawar",
  "phone": "1234567890",
  "whatsapp": "1234567890",
  "address": "CWA, IND",
  "email": "rj@gmail.com"
}
```

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

To retrieve a list of all customers, send a GET request to `/api/customer/a`.

- **Endpoint:** `/api/customer/a`
- **Method:** GET
- **Response:** Customers list in JSON format.

```json
{
  "error": false,
  "message": "Customers List",
  "customers": [
    {
      "id": 1,
      "name": "John Doe",
      "address": "123 Main St, Anytown, USA",
      "phone": "555-123-4567",
      "email": "john@example.com",
      "whatsapp": "555-987-6543",
      "createtime": "2023-10-21T13:27:51.000Z"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "address": "456 Elm St, Othertown, USA",
      "phone": "555-555-5555",
      "email": "jane@example.com",
      "whatsapp": "555-111-2222",
      "createtime": "2023-10-21T13:27:51.000Z"
    }
  ]
}
```

## Delete a Customer

To delete a customer, send a DELETE request to `/api/customer/{customerId}`.

- **Endpoint:** `/api/customer/{customerId}`
- **Method:** DELETE
- **URL Parameter:**
  - `customerId` (integer) - The ID of the customer to delete.

Include additional details and explanations as needed in your `README.md` to make the documentation clear and comprehensive.
```
