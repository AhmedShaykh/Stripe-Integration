import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {

    const { carts } = useSelector((state) => state.allCart);

    return (
        <div className="py-12 bg-black text-white flex items-center justify-between px-4">
            <NavLink to="/" className="text-white no-underline mx-2">
                <h3 className="text-white text-xl font-semibold">
                    Ecommerce App
                </h3>
            </NavLink>

            <NavLink to="/cart" className="text-white no-underline mx-8 relative">
                <span className="bg-red-600! text-white text-md w-8 h-8 rounded-full flex items-center justify-center">
                    {carts.length}
                </span>
            </NavLink>
        </div>
    )
};

export default Header;