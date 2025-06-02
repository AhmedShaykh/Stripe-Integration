"use client";
import { useState } from "react";

const products = [
    { name: "Stripe Product", price: 400, quantity: 3 },
    { name: "Stripe Product2", price: 40, quantity: 2 },
    { name: "Stripe Product3", price: 4000, quantity: 1 }
];

const Checkout = () => {

    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {

        setLoading(true);

        try {
            const res = await fetch("http://localhost:8080/stripe/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ products })
            });

            const { url } = await res.json();

            if (url) {

                window.location.href = url;

            }

        } catch (error) {

            console.error("Checkout Error", error);

            alert("Failed to redirect to Stripe Checkout");

        }

        setLoading(false);

    };

    return (
        <div className="flex items-center justify-center flex-col gap-8 h-screen">
            <h1 className="text-3xl font-bold">
                Stripe Checkout
            </h1>

            <button
                className="p-3 bg-blue-600 rounded-lg text-lg"
                onClick={handleCheckout}
                disabled={loading}
            >
                {loading ? "Redirecting..." : "Pay with Stripe"}
            </button>
        </div>
    );
};

export default Checkout;