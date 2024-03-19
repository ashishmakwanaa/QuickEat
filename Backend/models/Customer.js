const mongoose = require("mongoose");
const {Schema}=mongoose;

const CustomerSchema = new Schema({
    firstname:{
        type:String,
        require:true,
    },
    lastname:{
        type:String,
        require:true,
    },
    emailid:{
        type:String,
        require:true,
    },
    phoneno:{
        type:Number,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    state:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true,
    },
    pincode:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("customers",CustomerSchema)