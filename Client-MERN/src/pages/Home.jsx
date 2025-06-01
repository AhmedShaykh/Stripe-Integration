import { useState } from "react";
import { addToCart } from "../redux/cartSlice";
import CardsData from "../Components/CardData";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {

    const [cartData] = useState(CardsData);

    const dispatch = useDispatch();

    const send = (e) => {

        dispatch(addToCart(e));

        toast.success("Item added In Your Cart");

    };

    return (
        <>
            <div className="flex justify-center flex-wrap align-items-center gap-8 px-8">
                {cartData.map((element, index) => {
                    return (
                        <div
                            className="w-[22rem] border-noneD shadow-md rounded-lg overflow-hidden mb-4 hover:shadow-lg transition duration-300"
                            key={index}
                        >
                            <img src={element.imgdata} alt="dish" className="w-full h-48 object-cover" />

                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-lg font-semibold">{element.dish}</h4>

                                    <span className="text-yellow-500 font-medium">{element.rating} ★</span>
                                </div>

                                <div className="flex justify-between mb-2">
                                    <h5 className="text-sm text-gray-600">{element.address}</h5>

                                    <span className="text-base font-medium">$ {element.price}</span>
                                </div>

                                <div className="h-2" />

                                <div className="flex justify-between items-center mt-4">
                                    <img src={element.arrimg} alt="arrow" className="w-8 h-8 object-contain" />

                                    <button
                                        className="bg-[#ff3054db]! text-white px-4 py-2 rounded-md w-[150px] text-sm hover:bg-[#e02445] transition duration-300"
                                        onClick={() => send(element)}
                                    >
                                        Add TO Cart
                                    </button>

                                    <img src={element.delimg} alt="delete" className="w-8 h-8 object-contain" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <ToastContainer position="top-center" />
        </>
    )
};

export default Home;