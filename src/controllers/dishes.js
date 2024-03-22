const Dishes = require('../models/dishes');

exports.getDishes = (req, res) => {
  Dishes.find()
    .then(dishes => {
      res.json(dishes); // Response should send the dishes retrieved from the database
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};
