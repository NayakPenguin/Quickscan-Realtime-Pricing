const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://seriousanurag123:anurag83@cluster0.edegawp.mongodb.net/?retryWrites=true&w=majority",
{  //connecting the databae
    useNewUrlParser: true ,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Database Connection Succesful !!!');
}).catch((err)=> console.log(err,"Error in establishing Database."));

module.exports =  mongoose ;