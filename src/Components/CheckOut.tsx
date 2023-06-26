"use client";
import { Button } from "./ui/button";

const CheckOut = () => {

    const handleCheckOut = () => {};

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