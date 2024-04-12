const mongoose = require('mongoose') ;
const schema = ({
    name: String,
    mobile: String,
    email: String
})

module.exports = mongoose.model('User',schema) ;