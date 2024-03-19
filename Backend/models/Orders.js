const mongoose = require("mongoose");
const { Schema } = mongoose;

const selectedItem = new Schema({
    itemname: {
        type: String,
       
    },
    itemprice: {
        type: String,
        
    },
    itemqty: {
        type: Number,
       
    },
    totalPrice: {
        type: String,
    }
})

const OrdersSchema = new Schema({
    customerId: {
        type: String,
        required: true
    },
    customerfirstname: {
        type: String,
        required: true,
    },
    customerlastname: {
        type: String,
        required: true,
    },
    customerphoneno: {
        type: Number,
        required: true,
    },
    customeremailid: {
        type: String,
        required: true
    },
    selectedItem: [selectedItem],
    totalAmount: {
        type: String,
        required: true
    },
    Date:{
        type:Date,
        required:true
    }

})

module.exports = mongoose.model("orders", OrdersSchema)