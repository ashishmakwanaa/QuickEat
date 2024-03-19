const mongoose = require("mongoose");
const express = require("express");
const Customer = require("../models/Customer");
const Item = require("../models/Item");

const router = express.Router();

router.delete("/deleteCustomer/:customerid",async(req,res)=>{
    try {
        const customerId= req.params.customerid;
        
        const customer = await Customer.findById(customerId);
        if(!customer){
            return res.status(404).json({message:"Customer Not Found"})
        }
        await customer.deleteOne();
        return res.status(200).json({message:"Customer Deleted"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
    }
})

router.delete("/deleteItem/:itemId",async(req,res)=>{
    try {
        const itemId= req.params.itemId;
        
        const item = await Item.findById(itemId);
        if(!item){
            return res.status(404).json({message:"Item Not Found"})
        }
        await item.deleteOne();
        return res.status(200).json({message:"Item Deleted"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
    }
})

module.exports = router;