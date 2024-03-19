const mongoose = require("mongoose");
const mongoURI ="mongodb+srv://mongodbatlas:mongodbatlas1234@cluster0.69lknpi.mongodb.net/QuickEat?retryWrites=true&w=majority"
const connectToMongo = () =>{
    mongoose.connect(mongoURI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        console.log("Mongodb Connection Established")
    }).catch((error)=>{
        console.log(error);
    })
}

module.exports = connectToMongo;