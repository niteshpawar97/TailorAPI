const express = require('express');
const app = express();
const UserRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes');
const { log } = require('console');

const port = process.env.PORT || 3000;

app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with the allowed origin if needed
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use('/api/', UserRoutes);
app.use('/api/customer/', customerRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  
});
