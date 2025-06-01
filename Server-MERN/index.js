const express = require("express");
const cors = require("cors");
require("dotenv").config();

const stripeSecret = process.env.STRIPE_SECRET;

const stripe = require("stripe")(stripeSecret);

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use(cors());

app.post("/api/create-checkout-session", async (req, res) => {

    try {

        const { products } = req.body;

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.dish,
                    images: [product.imgdata]
                },
                unit_amount: Math.round(product.price * 100)
            },
            quantity: product.qnty
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel"
        });

        res.json({ id: session.id });

    } catch (error) {

        console.error("Stripe session error:", error);

        res.status(500).json({ error: "Something went wrong creating checkout session" });

    }

});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));