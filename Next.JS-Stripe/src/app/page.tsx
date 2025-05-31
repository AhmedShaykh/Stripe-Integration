import React from "react";
import CheckOut from "@/Components/CheckOut";

const Home = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl my-8 font-bold">
                Stripe Integration In Next.JS
            </h1>

            <CheckOut />
        </div>
    )
};

export default Home;