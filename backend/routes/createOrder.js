require("dotenv").config();
const express = require("express")
const Razorpay = require("razorpay")
const createOrderRoute = express.Router()

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

createOrderRoute.post("/", async (req, res) => {
    const { amount } = req.body;

    try {
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: `rcpt_${Math.floor(Math.random() * 10000)}`,
        });
        res.json(order);
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).send("Unable to create Razorpay order");
    }
});

module.exports = createOrderRoute