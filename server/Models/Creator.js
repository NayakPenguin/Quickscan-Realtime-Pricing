const mongoose = require('mongoose');

const creatorSchema = new mongoose.Schema({
    creatorShopId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Creator', creatorSchema);