const Product = require('./products.model');
const Joi = require('joi');

module.exports = {
  async getOneProduct(req, res) {
    const id = req.params.id;

    try {
      const product = await Product.findById(id);

      if (!product)
        return res.status(404).send({
          ok: false,
          msg: 'Product not found with the given ID',
        });

      res.send({ ok: true, data: product });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ ok: false, msg: 'Internal Server Error' });
    }
  },
  async getAllProducts(req, res) {
    const products = await Product.find();

    res.send({
      ok: true,
      data: products,
    });
  },
  async createOneProduct(req, res) {
    const schema = Joi.object({
      title: Joi.string().required(),
      year: Joi.number().required(),
      color: Joi.string().required(),
      desc: Joi.string().required(),
      price: Joi.number().required(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).send({
        ok: false,
        msg: result.error.details[0].message,
      });
    }

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
  },
  async updateOneProduct(req, res) {
    const id = req.params.id;

    const schema = Joi.object({
      title: Joi.string(),
      year: Joi.number(),
      color: Joi.string(),
      desc: Joi.string(),
      price: Joi.number(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).send({
        ok: false,
        msg: result.error.details[0].message,
      });
    }

    // let product = await Product.findById(id);

    // product.year = 1990;

    // // product = { ...product, ...req.body };

    // await product.save();

    // res.send(product);

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.send({ ok: true, data: updatedProduct });
  },
  async deleteOneProduct(req, res) {
    const id = req.params.id;

    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      res.send({ ok: true, data: deletedProduct });
    } catch (err) {
      console.error(err.message);
      res.status(404).send({ ok: false, msg: 'Id given not correct' });
    }
  },
};

// // http://localhost:8000/products?title=Tintin
// app.get('/products/title', (req, res) => {
//   // 1 - récupérer la query title
//   const title = req.query.title;

//   // 2 - renvoyer au client le bon livre
//   const product = products.find(
//     product => product.title.toLowerCase() === title.toLowerCase()
//   );

//   if (!product)
//     return res.status(404).send({
//       ok: false,
//       msg: 'Product not found',
//     });

//   res.send({
//     ok: true,
//     data: product,
//   });
// });
