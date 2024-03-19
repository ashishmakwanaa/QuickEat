const express = require("express");
const User = require("../models/User.js")
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");


//Route 1: Create a user for adding the data in database

const keysecret = "ashisdbhcdjknekwjdwhebwjhfbjhbf";
const transpoter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "ashishmak2406@gmail.com",
        pass: "absq uyme ugbo gnud"
    }
})

router.post("/signup", async (req, res) => {
    const { restaurantname, ownername, address, emailid, password } = req.body;
    const confirmpassword = req.body.confirmpassowrd;

    try {
        // Check if any of the fields are empty
        if (restaurantname === '' || ownername === '' || address === '' || emailid === '' || password === '' || confirmpassword === '') {
            return res.status(400).json({ message: "Please fill in all the details." });
        }

        let user = await User.findOne({ emailid: emailid });

        if (user) {
            return res.status(409).json({ message: "Sorry, a user with this email already exists." });
        }
        console.log(password, confirmpassword)
        // Check if passwords match
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        const hashpassword = await bcrypt.hash(password,12);

        // Create the user
        user = await User.create({
            restaurantname,
            ownername,
            address,
            emailid,
            password:hashpassword,
            confirmpassword,
        });

        return res.status(200).json({ message: "Successfully signed up", user });
    } catch (error) {
        console.log("Error during signup:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});





//ROUTER 2 : LOGIN

router.post("/login", [], async (req, res) => {
    const { emailid, password } = req.body;

    try {

        if (emailid === '' || password === '') {
            return res.status(400).json({ message: "Please fill all details" })
        }

        let user = await User.findOne({ emailid });
        if (!user) {
            return res.status(400).json({ message: "User has don't have an account" })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Password does not match" });
        }
        return res.status(200).json({ message: "Successfully Login", user })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error:" })
    }
})

//ROUTER 3:FORGOT PASSWORD

router.post('/forgotPassword', [], async (req, res) => {
    const { email } = req.body;
    console.log(email);
    if (!email) {
        res.status(401).json({ message: "Enter Your Email" })
    }
    try {
        let user = await User.findOne({ emailid: email });
        // console.log(user)
        if (!user) {
            return res.status(401).json({ message: "User Does not Exists" })
        }
        const token = jwt.sign({ _id: user.id }, keysecret, {
            expiresIn: "24h"
        })
        // console.log(token)
        const userToken = await User.findByIdAndUpdate({ _id: user.id }, { verifyToken: token })
        console.log(userToken)

        if (userToken) {
            const mailOption = {
                from: "ashishmak2406@gmail.com",
                to: email,
                subject: "Reset Your Password",
                text: `This Link Is Valid For 5 Minutes http://localhost:3000/forgotpassword/${user.id}/${userToken.verifyToken}`
            }
            transpoter.sendMail(mailOption, (error, info) => {
                if (error) {
                    return res.status(400).json({ message: "Email Not Send" })
                }
                else {
                    return res.status(201).json({ message: "Email Send Successfully" })
                }
            })
            return res.status(201).json({ message: "Email Send Succesfully" })
        }
    } catch (error) {
        res.status(401).json({ message: 'Invalid User' })
    }
})

router.get('/forgotpassword/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    try {
        const validator = await User.findOne({ _id: id, verifyToken: token })
        const veritoken = jwt.verify(token, keysecret);
        if (validator && veritoken._id) {
            return res.status(201).json({ validator })
        }
        else {
            return res.status(404).json({ message: "User Not Found" });
        }
    }
    catch (error) {
        return res.status(401).json({ error })
    }
})
//ROUTE FOR RESET PASSWORD

router.post("/:id/:token", async (req, res) => {
    const id = req.params.id;
    const token = req.params.token;
    const newPassword = req.body.password;
    // console.log(id, token);
    console.log(newPassword)

    try {
        console.log("kunal")
        // Verify the token
        console.log(token)
        const decodedToken = jwt.verify(token, keysecret);
        
        console.log("kunal2")
        console.log(decodedToken)
        // Find the user by ID
        const validateUser = await User.findById(id);

        // Check if the token corresponds to the user and if the user exists
        if (!validateUser || validateUser._id.toString() !== decodedToken._id) {
            return res.status(401).json({ error: "Invalid user or token." });
        }

        // Update the user's password
        validateUser.password = newPassword;
        const updatedUser = await validateUser.save();

        return res.status(201).json({ updatedUser });
    } catch (error) {
        console.log(error)
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token expired. Please request a new one." });
        }
        return res.status(500).json({ error: error.message });
    }
});


module.exports = router;
