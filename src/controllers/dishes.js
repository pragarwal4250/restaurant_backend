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
  try {
    const dishes = req.body; // Assuming req.body contains an array of dishes

    const savedDishes = await Promise.all(dishes.map(async dishData => {
      const { name, category, description, price, image } = dishData;
      const parsedPrice = parseInt(price.replace(/\$/g, ''), 10); // Convert price string to integer
      const newDish = new Dish({ name, category, description, price: parsedPrice, image });
      return await newDish.save();
    }));

    res.json(savedDishes); // Response sends the dishes saved to the database
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};