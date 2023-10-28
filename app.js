const express = require('express');
const app = express();
const UserRoutes = require('./routes/userRoutes');
const CustomerRoutes = require('./routes/customerRoutes');
const ProductRoutes = require('./routes/productRoutes');

const port = process.env.PORT || 3000;

app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with the allowed origin if needed
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Store_id');
  next();
});
app.use('/api/', UserRoutes);
app.use('/api/customer/', CustomerRoutes);
app.use('/api/product/', ProductRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  
});
