const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    
    category: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: false,
    },

    price: {
        type: Number,
        required: true,
    },

    image: {
        type: String,
        required: false,
    },

});

module.exports = mongoose.model('dishes', dishSchema);