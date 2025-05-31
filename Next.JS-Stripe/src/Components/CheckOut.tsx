"use client";
import getStipePromise from "@/lib/stripe";
import { Button } from "./ui/button";

const products = [
    {
        product: 1,
        name: "Stripe Product",
        price: 400,
        quantity: 3,
    },
    {
        product: 2,
        name: "Stripe Product2",
        price: 40,
        quantity: 2,
    },
    {
        product: 3,
        name: "Stripe Product23",
        price: 4000,
        quantity: 1,
    },
];

const CheckOut = () => {

    const handleCheckOut = async () => {

        const stripe = await getStipePromise();

        const response = await fetch("/api/stripe/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-cache",
            body: JSON.stringify(products)
        });

        const data = await response.json();

        if (data.session) {
            stripe?.redirectToCheckout({ sessionId: data.session.id });
        }

    };

    return (
        <div className="my-2">
            <Button
                className="text-xl font-semibold p-6 rounded-lg bg-blue-700 hover:bg-white hover:text-black"
                onClick={handleCheckOut}
            >
                Check Out
            </Button>
        </div>
    )
};

export default CheckOut;