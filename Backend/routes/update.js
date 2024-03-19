const mongoose  = require("mongoose");
const express = require("express");
const Customer = require('../models/Customer');
const Item = require("../models/Item");
const router = express.Router();
const User = require("../models/User")
const bcrypt = require("bcryptjs")


router.post("/editCustomer/:customerId",[],async(req,res)=>{
    try {
       
        const customerId = req.params.customerId;
        const {firstname,lastname,emailid,phoneno,address,state,city,pincode}=req.body;
      
        let customer = await Customer.findById(customerId)
        if(!customer){
            return res.status(400).json({message:"Customer Not Found"})
        }
        customer.firstname = firstname;
        customer.lastname = lastname;
        customer.emailid=emailid;
        customer.address = address;
        customer.phoneno = phoneno;
        customer.state = state;
        customer.city = city;
        customer.pincode = pincode;

        await customer.save();
        console.log(customer)
        return res.status(200).json({message:"Customer Updated",customer})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"})
    }
})

router.post("/updateItem/:itemId",async(req,res)=>{
    try {
        const itemId = req.params.itemId;
        const {itemname,itemdescription,price,quantity,image,upToOffer}=req.body;

        let  item = await Item.findById(itemId);
        if(!item){
            return res.status(400).json({message:"Item Not Found"});
        }
        item.itemname = itemname;
        item.itemdescription = itemdescription;
        item.price=price;
        item.quantity = quantity;
        item.image = image;
        item.upToOffer=upToOffer

        await item.save();
        return res.status(200).json({message:"Item Update Successfully",item})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
    }
})

router.post("/update_quantity",async(req,res)=>{
    const {itemname,quantity}=req.body;

    try {
        let item = await Item.findOne({itemname});
        if(!item){
            return res.status(400).json({message:"Item not Found"});
        }
        item.quantity=parseInt(quantity);
        await item.save();
        return res.status(200).json({message:"Item Qty Update Successfully",item})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
})

router.post("/updatepassword/:restaurantname",async(req,res)=>{
    const {oldpassword,newpassword,newchangepassword} = req.body
    const restaurantname = req.params.restaurantname
    console.log(restaurantname)
    try {
        let user = await User.findOne({restaurantname})
        if(!user){
            return res.status(404).json({message:"User Has Not Found"})
        }
        if(!oldpassword || !newpassword || !newchangepassword){
            return res.status(404).json({message:"Please Fill All Fields"})
        }
        if(newpassword !== newchangepassword){return res.status(400).json({message:"Password Should Not Match"})}
        const hashpassword = await bcrypt.hash(newpassword,10)
         user.password = hashpassword;
         await user.save();
         return res.status(200).json({message:"Password Changed",user})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
})

module.exports = router;