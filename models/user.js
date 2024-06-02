const { Schema, model } = require('mongoose');

const CartSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = model('Cart1', CartSchema);