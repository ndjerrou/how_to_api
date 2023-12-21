const path = require('path');

const express = require('express');
const morgan = require('morgan');

const products = require('./resources/products/products.route');

const app = express();

require('dotenv').config(); // process.env
require('./db/connect')();

app.use(morgan('tiny'));
// registering middlewares = une fonction
app.use((req, res, next) => {
  console.log('Je suis un middleware et le premier !');
  console.log('is user ?', req.user);
  req.user = 'Nissim';
  res.pokemon = 'bulbizarre';
  next(); // go to next middleware
});
app.use((req, res, next) => {
  console.log('Je suis le 2e middleware');
  console.log('is user ?', req.user);
  console.log('is body?', req.body);
  console.log('Method : ', req.method);
  console.log('Hostname : ', req.hostname);
  console.log('Headers : ', req.headers);
  next(); // go to next middleware
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // 2
app.use((req, res, next) => {
  console.log('5e middleware');
  console.log('is body?', req.body);
  console.log('is pokemon ?', res.pokemon);
  // res.send('Stop connexion');
  next();
});

app.use('/api/v1/products', products);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.clear();
  console.log(`Listenning on port ${PORT}`);
});
