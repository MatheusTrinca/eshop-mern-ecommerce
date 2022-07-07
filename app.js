const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const api = process.env.API_URL;
const morgan = require('morgan');
const app = express();
const productsRouter = require('./routers/product');

// Middlewares
app.use(express.json());
app.use(morgan('tiny'));

// Routers
app.use(`${api}/products`, productsRouter);

// Database Connection
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

// Server Listening
app.listen(3000, () => console.log('Server listening on port 3000'));

// 1:21:40
