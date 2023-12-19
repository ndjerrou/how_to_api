const path = require('path');

const express = require('express');

const Product = require('./resources/products/products.model');
const writeFile = require('./utils/file');

const app = express();

require('dotenv').config(); // process.env
require('./db/connect')();

// registering middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const products = require('./products.json');

// CRUD - Create Read Update Delete

// [GET /users - GET /users/id - POST /users - PUT /users/id - DELETE /users/id] ==> API RESTFull

app.get('/products', async (req, res) => {
  const products = await Product.find();

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

app.post('/products', async (req, res) => {
  const product = new Product({ ...req.body }); // a single document

  try {
    await product.save();
    res.status(201).send({
      ok: true,
      data: product,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      ok: false,
      msg: 'Internal Server Error',
    });
  }
});

app.put('/products/:id', async (req, res) => {
  const id = +req.params.id;

  const product = products.find(product => product.id === id);

  if (!product)
    return res.status(404).send({
      ok: false,
      msg: 'Product not found',
    });

  const modifiedProducts = products.map(product => {
    if (product.id === id) product = { ...product, ...req.body };

    return product;
  });

  const isWritten = await writeFile(savingPath, modifiedProducts);

  if (isWritten)
    return res.status(201).send({ ok: true, data: modifiedProducts });

  res.status(500).send({
    ok: false,
    msg: 'Problem Server',
  });
});

app.delete('/products/:id', async (req, res) => {
  const id = +req.params.id;

  const product = products.find(product => product.id === id);

  if (!product)
    return res.status(404).send({
      ok: false,
      msg: 'Product not found',
    });

  const filteredProducts = products.filter(product => product.id !== id);

  const isWritten = await writeFile(savingPath, filteredProducts);

  if (isWritten)
    return res.status(200).send({ ok: true, data: filteredProducts });

  res.status(500).send({
    ok: false,
    msg: 'Problem Server',
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.clear();
  console.log(`Listenning on port ${PORT}`);
});
