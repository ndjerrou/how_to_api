const express = require('express');

const app = express();

// registering middlewares
// app.use(express.urlencoded({ extended: true }));

const products = require('./products.json');

// CRUD - Create Read Update Delete

// [GET /users - GET /users/id - POST /users - PUT /users/id - DELETE /users/id] ==> API RESTFull

app.get('/products', (req, res) => {
  res.send(products);
});

// http://localhost:8000/products?title=Tintin
app.get('/products/title', (req, res) => {
  //   const book = products[0];

  // 1 - récupérer la query title

  // 2 - renvoyer au client le bon livre

  res.send(req.query);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listenning on port ${PORT}`);
});
