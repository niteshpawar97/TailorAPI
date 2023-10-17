const express = require('express');
const app = express();
const mysql = require('mysql2');

// create the connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'cloudtally',
  password: ''
});

// Define the port for the server
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Route to get all shop users
app.get('/', (req, res) => {
  connection.query('SELECT * FROM `shop_users`', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(results);
  });
});


// Route to create a new shop user
app.post('/', (req, res) => {
  const { name, mobile, password } = req.body;
  if (!name || !mobile || !password) {
    res.status(400).json({ error: 'Name, Mobile and Password are required' });
    return;
  }

  connection.query('INSERT INTO `shop_users` (NAME, MOB, PWD) VALUES (?, ?, ?)', [name,mobile, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.status(201).json({ message: 'User created', id: results.insertId });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
