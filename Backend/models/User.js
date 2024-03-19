const mongoose = require("mongoose");
const {Schema} = mongoose;
const UserSchema = new Schema({
    restaurantname:{
        type:String,
        require:true,
    },
    ownername:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    emailid:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    confirmpassword:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:new Date()
    },
    verifyToken:String,
})

module.exports = mongoose.model('users',UserSchema);