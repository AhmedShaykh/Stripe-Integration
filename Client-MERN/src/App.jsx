import { Route, Routes } from "react-router-dom";
import CartDetails from "./pages/CartDetails";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Home from "./pages/Home";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<CartDetails />} />
                <Route path="/success" element={<Success />} />
                <Route path="/cancel" element={<Cancel />} />
            </Routes>
        </>
    )
};

export default App;