const mongoose = require("mongoose");
const {Schema}=mongoose;

const FoodItemSchema = new Schema({
    itemname:{
        type:String,
        required:true,
    },
    itemdescription:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    upToOffer:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("items",FoodItemSchema)