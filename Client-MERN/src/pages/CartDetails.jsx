import { useEffect, useState } from "react";
import { addToCart, emptycartIteam, removeSingleIteams, removeToCart } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const CartDetails = () => {

    const [totalprice, setPrice] = useState(0);

    const [totalquantity, setTotalQuantity] = useState(0);

    const { carts } = useSelector((state) => state.allCart);

    const dispatch = useDispatch();

    const handleIncrement = (e) => {

        dispatch(addToCart(e));

    };

    const handleDecrement = (e) => {

        dispatch(removeToCart(e));

        toast.success("Item Remove From Your Cart");

    };

    const handleSingleDecrement = (e) => {

        dispatch(removeSingleIteams(e));

    };

    const emptycart = () => {

        dispatch(emptycartIteam());

        toast.success("Your Cart is Empty");

    };

    const total = () => {

        let totalprice = 0;

        carts.map((ele, ind) => {

            totalprice = ele.price * ele.qnty + totalprice;

        });

        setPrice(totalprice);

    };

    const countquantity = () => {

        let totalquantity = 0;

        carts.map((ele, ind) => {

            totalquantity = ele.qnty + totalquantity;

        });

        setTotalQuantity(totalquantity);

    };

    useEffect(() => {

        total();

    }, [total]);

    useEffect(() => {

        countquantity();

    }, [countquantity]);

    const makePayment = async () => {

        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

        const body = { products: carts };

        const response = await fetch("http://localhost:8080/api/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {

            console.log(result.error);

        }

    };

    return (
        <>
            <div className="flex justify-center">
                <div className="w-full max-w-7xl mt-5 mb-5">
                    <div className="bg-white shadow rounded">
                        <div className="bg-gray-900 p-3 flex justify-between items-center rounded-t">
                            <h5 className="text-white text-lg font-medium py-2">
                                Cart Calculation {carts.length > 0 ? `(${carts.length})` : ""}
                            </h5>

                            {carts.length > 0 && (
                                <button
                                    className="bg-red-600! text-whitete xt-lg font-medium py-1 px-3 rounded hover:bg-red-700"
                                    onClick={emptycart}
                                >
                                    Empty Cart
                                </button>
                            )}
                        </div>

                        <div className="p-0">
                            {carts.length === 0 ? (
                                <table className="w-full table-auto mb-0">
                                    <tbody>
                                        <tr>
                                            <td colSpan={6} className="text-center py-10">
                                                <div className="flex flex-col items-center gap-2 text-gray-500">
                                                    <i className="fa fa-shopping-cart text-4xl"></i>
                                                    <p>Your Cart Is Empty</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full table-auto mb-0 text-sm">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th>Action</th>
                                                <th>Product</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th className="text-right">Total Amount</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {carts.map((data, index) => (
                                                <tr key={index} className="border-b">
                                                    <td className="text-center">
                                                        <button onClick={() => handleDecrement(data.id)} className="text-red-600! text-3xl">
                                                            x
                                                        </button>
                                                    </td>
                                                    <td className="text-center">
                                                        <img src={data.imgdata} alt="" className="w-12 h-12 object-cover mx-auto" />
                                                    </td>
                                                    <td className="text-center">{data.dish}</td>
                                                    <td className="text-center">$ {data.price}</td>
                                                    <td className="text-center">
                                                        <div className="flex justify-center items-center gap-1">
                                                            <button
                                                                type="button"
                                                                onClick={
                                                                    data.qnty <= 1
                                                                        ? () => handleDecrement(data.id)
                                                                        : () => handleSingleDecrement(data)
                                                                }
                                                                className="px-2 py-1 bg-gray-200 rounded text-3xl"
                                                            >
                                                                -
                                                            </button>

                                                            <input
                                                                type="text"
                                                                value={data.qnty}
                                                                disabled
                                                                className="w-10 text-center border border-gray-300 rounded"
                                                            />

                                                            <button
                                                                type="button"
                                                                onClick={() => handleIncrement(data)}
                                                                className="px-2 py-1 bg-gray-200 rounded text-3xl"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="text-right">$ {data.qnty * data.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>

                                        <tfoot className="bg-gray-100 font-semibold">
                                            <tr>
                                                <td colSpan={3}></td>
                                                <td>
                                                    Items In Cart:{" "}
                                                    <span className="text-red-600">{totalquantity}</span>
                                                </td>
                                                <td className="text-right" colSpan={1}>
                                                    Total Price:{" "}
                                                    <span className="text-red-600">$ {totalprice}</span>
                                                </td>
                                                <td className="text-right">
                                                    <button
                                                        type="button"
                                                        onClick={makePayment}
                                                        className="bg-green-600! text-white px-4 py-2 rounded hover:bg-green-700"
                                                    >
                                                        Checkout
                                                    </button>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-center" />
        </>
    )
};

export default CartDetails;