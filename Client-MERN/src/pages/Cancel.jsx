import { NavLink } from "react-router-dom";

const Cancel = () => {
    return (
        <div className="grid place-items-center py-52 gap-20">
            <h1 className="text-5xl font-extrabold">
                Error 404
            </h1>

            <NavLink to="/">
                <h3 className="text-2xl font-medium text-blue-700!">
                    Go Home
                </h3>
            </NavLink>
        </div>
    )
};

export default Cancel;