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

// Dealing with Query String Parameters

// http://localhost:8000/products?title=Tintin
app.get('/products/title', (req, res) => {
  // 1 - récupérer la query title
  const title = req.query.title;

  // 2 - renvoyer au client le bon livre
  const product = products.find(
    product => product.title.toLowerCase() === title.toLowerCase()
  );

  if (!product)
    return res.status(404).send({
      ok: false,
      msg: 'Product not found',
    });

  res.send({
    ok: true,
    data: product,
  });
});

// route parameters
app.get('/products/:id', (req, res) => {
  const id = +req.params.id;

  const product = products.find(product => product.id === id);

  if (!product)
    return res.status(404).send({
      ok: false,
      msg: 'Product not found',
    });

  res.send({ ok: true, data: product });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listenning on port ${PORT}`);
});
