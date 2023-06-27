"use client";
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

        const response = await fetch("/api/stripe/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-cache",
            body: JSON.stringify(products)
        });

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