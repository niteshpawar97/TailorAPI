const express = require('express');
const app = express();
const shopUserRoutes = require('./routes/shopUserRoutes');
const customerRoutes = require('./routes/customerRoutes');
const authRoutes = require('./routes/authRoutes');
const { log } = require('console');

const port = process.env.PORT || 5000;

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with the allowed origin if needed
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.json());
app.use('/', authRoutes);
app.use('/api/', shopUserRoutes);
app.use('/api/customer/', customerRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  
});
