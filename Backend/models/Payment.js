const mongoose = require("mongoose");
const {Schema} = mongoose;

const paymentSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    cardHoldername:{
        type:String,
        required:true
    },
    billingaddress:{
        street:{
            type:String,
        },
        city:{
            type:String,
        },
        state:{
            type:String,
        },
        pincode:{
            type:String,
        },
        country:{
            type:String
        }
    },
    amount:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now()
    }
})

const Payment = mongoose.model("payments",paymentSchema);
module.exports = Payment;