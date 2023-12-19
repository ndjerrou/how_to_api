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

  res.send({
    ok: true,
    data: products,
  });
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
app.get('/products/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);

    res.send({ ok: true, data: product });
  } catch (err) {
    console.error(err.message);
    res.status(404).send({
      ok: false,
      msg: 'Product not found with the given ID',
    });
  }
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
  const id = req.params.id;

  // let product = await Product.findById(id);

  // product.year = 1990;

  // // product = { ...product, ...req.body };

  // await product.save();

  // res.send(product);

  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.send(updatedProduct);
});

app.delete('/products/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.send({ ok: true, data: deletedProduct });
  } catch (err) {
    console.error(err.message);
    res.status(404).send({ ok: false, msg: 'Id given not correct' });
  }

  res.send(deletedProduct);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.clear();
  console.log(`Listenning on port ${PORT}`);
});
