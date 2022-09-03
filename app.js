const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const api = process.env.API_URL;
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const productsRoutes = require('./routes/productRouter');
const categoriesRoutes = require('./routes/categoryRouter');

// Middlewares
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('tiny'));

// Routers
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);

// Database Connection
mongoose
  .connect(process.env.CONNECTION_STRING, {
    dbName: 'eshop-database',
  })
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

// Server Listening
app.listen(3000, () => console.log('Server listening on port 3000'));

// 2:35:28
