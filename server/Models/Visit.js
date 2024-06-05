const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    creatorShopId: {
        type: String,
        required: true
    },
    lastVisit: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Visit', visitSchema);