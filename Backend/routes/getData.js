const mongoose  = require("mongoose");
const express = require("express");
const Customer = require('../models/Customer');
const Item = require('../models/Item');

const router = express.Router();

router.get("/customers",async(req,res)=>{
    try {
        let customer = await Customer.find();
        console.log(customer);
        if(!customer){
            return res.status(400).json({message:"Customer Don't Exists"})
        }
        return res.status(200).json({message:"success",customer});
    } catch (error) {
        return res.status(500).json({message:"internal Server Error"});
    }
})

router.get("/customers/:id",async(req,res)=>{
    try {
        const newId = req.params.id;
        let customer = await Customer.findById({_id:newId})
        
        if(!customer){
            return res.status(404).json({message:"Invalid ID, Customer Don't Exists"});
        }
        return res.status(200).json({message:"customer find success",customer})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error"})
    }
})


router.get('/items',async(req,res)=>{
    try {
        let item = await Item.find();
        console.log(item)
        if(!item){
            return res.status(400).json({message:"Item Not Found"});
        }
        return res.status(200).json({message:"success",item})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
    }
})

module.exports = router;