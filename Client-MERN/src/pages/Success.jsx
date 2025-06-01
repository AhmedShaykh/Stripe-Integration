import { NavLink } from "react-router-dom";

const Success = () => {
    return (
        <div className="grid place-items-center py-52 gap-20">
            <h1 className="text-5xl font-extrabold">
                Transaction Successful
            </h1>

            <NavLink to="/">
                <h3 className="text-2xl font-medium text-blue-700!">
                    Go Home
                </h3>
            </NavLink>
        </div>
    )
};

export default Success;