const dishesController = require('../controllers/dishes')
const express = require('express');

const router = express.Router();

router.get('/dishes', dishesController.getDishes);
router.post('/dishes', dishesController.postDishes);

module.exports = router;