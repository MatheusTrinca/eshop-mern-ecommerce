require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const api = process.env.API_URL;
const morgan = require('morgan');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/errorHandler');
const app = express();
const productsRoutes = require('./routes/productRouter');
const categoriesRoutes = require('./routes/categoryRouter');
const usersRoutes = require('./routes/userRouter');
const orderRoutes = require('./routes/orderRouter');

// Middlewares
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

// Routers
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, orderRoutes);

// Database Connection
mongoose
  .connect(process.env.CONNECTION_STRING, {
    dbName: 'eshop-database',
  })
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

// Server Listening
app.listen(3000, () => console.log('Server listening on port 3000'));

// 5:49:18
