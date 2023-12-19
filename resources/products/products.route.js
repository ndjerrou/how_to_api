const express = require('express');

const {
  createOneProduct,
  deleteOneProduct,
  getAllProducts,
  getOneProduct,
  updateOneProduct,
} = require('./products.controller');

const router = express.Router();

router.route('').get(getAllProducts).post(createOneProduct);
router
  .route('/:id')
  .get(getOneProduct)
  .put(updateOneProduct)
  .delete(deleteOneProduct);

module.exports = router;
