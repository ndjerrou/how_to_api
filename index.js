const path = require('path');

const express = require('express');

const products = require('./resources/products/products.route');

const app = express();

require('dotenv').config(); // process.env
require('./db/connect')();

// registering middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1/products', products);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.clear();
  console.log(`Listenning on port ${PORT}`);
});
