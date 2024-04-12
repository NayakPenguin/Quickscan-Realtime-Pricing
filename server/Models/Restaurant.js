const mongoose = require('mongoose') ;
const schema = ({
  restaurant_id : String ,
  owner_access_key : String ,
  man_access_key : String ,
  allowed_email_ids : [String] ,
  is2FA:Number ,
})

module.exports = mongoose.model('Restaurant login',schema) ;