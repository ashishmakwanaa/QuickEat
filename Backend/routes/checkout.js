const express  = require("express");
const mongoose = require("mongoose");
const Stripe = require('stripe');
const stripe = Stripe("sk_test_51Or1VUSJ1Nchf02xsKcQFcsNTxu0rBepogbGW3qkCKr16J2Q2CZcrF0VGA42aMI9SSBLC0kOUttLpQV7443oXc7v00GfCRDTRn");
const router = express.Router();
const Payment = require("../models/Payment");

router.post('/create-checkout-session', async (req, res) => {
    const orderData = req.body;
    console.log(orderData);
    try {
        const lineItems = orderData.selectedItem.map(item => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.itemname,
                    images:[item.image],
                },
                unit_amount: parseFloat((item.price) - (item.price * item.upToOffer / 100)) * 100

            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://localhost:3000/order/${orderData.customerID}?amount=${orderData.totalAmount}`,
            cancel_url: `http://localhost:3000/`,
            customer_email: orderData.customeremailid,
        });

        console.log("created session");
        res.send({ url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create checkout session" });
    }
});

router.post('/checkout-success', async (req, res) => {
  let carddata = req.body;
  console.log("cardData------------",carddata);
  try {
    let cashorderdata = await Payment.create({
      email: carddata.email,
      cardHoldername: carddata.cardHoldername,
      billingaddress: {
        street: carddata.billingaddress.street,
        city: carddata.billingaddress.city,
        state: carddata.billingaddress.state,
        pincode: carddata.billingaddress.pincode,
      },
      amount: carddata.amount,
      paymentMethod: carddata.paymentMethod
    })
    return res.status(200).json({message:"Payment Successfully",cashorderdata})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"})
  }
});

router.post("/cashpayment",async(req,res)=>{
  try {
    let cashdata = req.body;
    let cashorderdata = await Payment.create({
      email: cashdata.email,
      cardHoldername: cashdata.cardHoldername,
      billingaddress: {
        street: cashdata.billingaddress.street,
        city: cashdata.billingaddress.city,
        state: cashdata.billingaddress.state,
        pincode: cashdata.billingaddress.pincode,
      },
      amount: cashdata.amount,
      paymentMethod: cashdata.paymentMethod
    })
    return res.status(200).json({message:"Payment Successfully",cashorderdata})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"})
  }
})



module.exports = router;