const dishesController = require('../controllers/dishes')
const express = require('express');

const router = express.Router();

router.get('/dishes', dishesController.getDishes);

module.exports = router;