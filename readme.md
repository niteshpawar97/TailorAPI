````markdown
# TailorApp API Documentation

This documentation provides information on how to use the endpoints of the TailorApp API.

````
## How to run Node Sever and run Code autorun

 - **1:**           `sudo su root`
 - **2:**           `cd ../`
 - **3:**           `cd niketgroup-soft/htdocs/soft.niketgroup.in/api`
 - **3:**           `npm install pm2`
 - **4:**           `pm2 start app.js --name tailor`
 - **5:**           `pm2 save`
  
  # Actions

pm2 stop all           # Stop all processes
pm2 restart all        # Restart all processes

pm2 reload all         # Will 0s downtime reload (for NETWORKED apps)

pm2 stop 0             # Stop specific process id
pm2 restart 0          # Restart specific process id

pm2 delete 0           # Will remove process from pm2 list
pm2 delete all         # Will remove all processes from pm2 list


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


## Search Customers by Mobile Number

Search for customers by their mobile number. This endpoint allows you to find customers based on a partial or complete mobile number.

    URL: /api/customer/search/:mobileNumber

    Method: GET

    Parameters:
        mobileNumber (string): The mobile number to search for.

    Example:

    Request: GET `/api/customer/search/12345`



To retrieve a list of all customers, send a GET request to `/api/customer/all`.

- **Headers:** `Authorization: 'client-accesstoken'`
- **Endpoint:** `/api/customer/search/{mobileNumber}`
- **Method:** GET
- **Response:** Customers list in JSON format.

```json
{
    "error": false,
    "customer": [
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
        }
    ]
}
```

Include additional details and explanations as needed in your `README.md` to make the documentation clear and comprehensive.

```

```
