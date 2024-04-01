const mongoose = require('../mongooseConnector');

const addressSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        unique: true,
    },

    apt: {
        type: String
    },

    line1: {
        type: String,
        required: true,
    },

    line2: {
        type: String,
        required: false,
    },

    city: {
        type: String,
        required: true,
    },

    state: {
        type: String,
        required: true,
    },

    country: {
        type: String,
        required: true,
    },

    zip: {
        type: Number,
        required: true,
    },

    notes: {
        type: String,
        required: false,
    },
});

const profileSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    
    email: {
        type: String,
        required: true,
    },

    phone: {
        countryCode: {
            type: Number,
            required: true,
        },

        number: {
            type: Number,
            required: true
        }
    },

    addresses: {
        type: [addressSchema],
        required: true,
    },

});

module.exports = mongoose.model('Profile', profileSchema);