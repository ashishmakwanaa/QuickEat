const mongoose = require("mongoose");
const Customer = require("../models/Customer");
const express = require("express");
const router = express.Router();

const Item = require("../models/Item");
const Orders = require("../models/Orders");

router.post("/addCustomer", [], async (req, res) => {
    const { firstname, lastname, emailid, phoneno, address, state, city, pincode } = req.body;
    console.log(firstname, lastname, emailid, phoneno, address, state, city, pincode);
    try {
        let customer = await Customer.findOne({ emailid: emailid })

        if (customer) {
            return res.status(400).json({ message: "Customer Has Already Exists" })
        }
        customer = await Customer.create({
            firstname: firstname,
            lastname: lastname,
            emailid: emailid,
            phoneno: phoneno,
            address: address,
            state: state,
            city: city,
            pincode: pincode

        })
        console.log(customer)
        return res.status(200).json({ message: "Customer Added Successfully", customer })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" })
    }
    console.log(req.body);
})

router.post("/addItem", [], async (req, res) => {
    const { name, desc, price, qty, img,offer } = req.body;
    console.log(name, desc, price, qty, img,offer);

    try {
        let item = await Item.findOne({ itemname: name })
        if (item) {
            return res.status(400).json({ message: "Item Has Already Exists" })
        }
        item = await Item.create({
            itemname: name,
            itemdescription: desc,
            price: price,
            quantity: qty,
            image: img,
            upToOffer:offer
        })
        return res.status(200).json({ message: "Item Added Successfully", item })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

router.post("/addOrder", async (req, res) => {
    const { customerID, customerfirstname, customerlastname, customeremailid, customerphoneno, selectedItem, totalAmount,Date } = req.body;
    // console.log(customerID,customerfirstname,customerlastname,customeremailid,customerphoneno,selectedItem,totalAmount)
    try {
        let order = await Orders.findOne({ customerId: customerID })
        // if (order) {
        //     return res.status(404).json({ message: "Order Already Exists" });
        // }
        order = new Orders({
            customerId: customerID,
            customerfirstname: customerfirstname,
            customerlastname: customerlastname,
            customerphoneno: customerphoneno,
            customeremailid: customeremailid,
            selectedItem: selectedItem,
            totalAmount: totalAmount,
            Date:Date
        });

        // Save the order to the database
        await order.save();
        console.log(order)
        return res.status(200).json({ message: "Order Create Successfully", order })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

module.exports = router;
