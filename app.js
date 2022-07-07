const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv/config');
const morgan = require('morgan');
const app = express();
const api = process.env.API_URL;

app.use(express.json());
app.use(morgan('tiny'));

app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: 'Hair Dresser',
    image: 'some image',
  };
  res.send(product);
});

app.post(`${api}/products`, (req, res) => {
  const newProduct = req.body;
  res.send(newProduct);
});

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

app.listen(3000, () => console.log('Server listening on port 3000'));
