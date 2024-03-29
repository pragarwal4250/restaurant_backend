const Dish = require('../models/dishes');

exports.getDishes = async (req, res) => {
  await Dish.find()
    .then(dishes => {
      res.json(dishes); // Response should send the dishes retrieved from the database
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};

exports.postDishes = async (req, res) => {
  const { name, category, price} = req.body;
  const newDish = new Dish({ name, category, price });
  await newDish.save()
  .then(function(){
    res.json(newDish); // Response should send the dishes retrieved from the database
  })
  .catch(error => {
    res.status(500).json({ error: error.message });
  });
};