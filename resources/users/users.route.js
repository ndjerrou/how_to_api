const express = require('express');
const { signup, getAllUsers } = require('./users.controller');

const router = express.Router();

router.route('').post(signup);
router.route('').get(getAllUsers);

module.exports = router;
