const express = require('express');

const {
  createOneProduct,
  deleteOneProduct,
  getAllProducts,
  getOneProduct,
  updateOneProduct,
} = require('./products.controller');

const checkIncomingPayload = require('../../middlewares/checkIncomingPayload');

const router = express.Router();

router.route('').get(getAllProducts).post(createOneProduct);
router
  .route('/:id')
  .get(getOneProduct)
  .put(checkIncomingPayload, updateOneProduct)
  .delete(deleteOneProduct);

module.exports = router;
