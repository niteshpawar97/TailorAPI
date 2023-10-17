
Login api use in reactnative project (web and android) both app develop

use Method: 'Post' and input form use raw data: '{"mobile": "1234567890","password": "1"}'
http://192.168.248.140:5000/api/login

return response: "{
    "error": false,
    "message": "Login successful",
    "user": {
        "user_id": 2,
        "role": "superadmin",
        "username": "nitesh",
        "password_hash": "1234",
        "subscription_type": "Basic",
        "session_id": "2495060146",
        "session_date": "2023-05-15T19:33:03.000Z"
    }
}"