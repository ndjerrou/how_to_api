const path = require('path');

const express = require('express');

const products = require('./resources/products/products.route');

const app = express();

require('dotenv').config(); // process.env
require('./db/connect')();

// registering middlewares = une fonction
app.use((req, res, next) => {
  console.log('Je suis un middleware et le premier !');
  next(); // go to next middleware
});
app.use((req, res, next) => {
  console.log('Je suis le 2e middleware');
  next(); // go to next middleware
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // 2
app.use((req, res, next) => {
  console.log('5e middleware');
  res.send('Stop connexion');
});

app.use('/api/v1/products', products);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.clear();
  console.log(`Listenning on port ${PORT}`);
});
