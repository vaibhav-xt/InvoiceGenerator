import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProductForm from "../compoenents/AddProductForm";
import AlertComponent from "../compoenents/AlertComponent";
import RenderIvoices from "../compoenents/RenderInvoices";
import { useAppDispatch, useAppSelector } from "../store/services/hooks.service";
import ProductDisplay from "../compoenents/ProductDisplay";
import { logout } from "../store/slices/auth.slice";

export default function Product() {
    const navigate = useNavigate();
    const [displayForm, setDisplayForm] = useState<boolean>(false);
    const { products } = useAppSelector((state) => state.productState);
    const { isLoggedIn } = useAppSelector((state) => state.authState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [navigate, isLoggedIn]);

    const logoutLocal = () => {
        dispatch(logout());
        navigate("/login");
    }


    return (
        <div className="bg-gray-900 min-h-screen">
            <button
                className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 p-4 px-8 rounded-full font-bold text-xl text-white shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition-transform transform hover:scale-105"
                onClick={logoutLocal}
            >
                Logout
            </button>
            <AlertComponent />
            {/* main container */}
            {displayForm && <AddProductForm setDisplayForm={setDisplayForm} />}
            <div className="max-w-screen-xl w-full m-auto px-4 text-gray-600">
                <h1 className="text-white text-4xl font-bold text-center pt-8">Generate Invoice</h1>
                <div className="flex justify-center gap-4 items-center my-4">
                    <p className="text-white text-xl hidden md:block">To Generate Invoice add product.</p>
                    <button className="bg-white px-4 py-2 rounded-lg" onClick={() => setDisplayForm(true)}>
                        Add Product
                    </button>
                </div>
                {products.length !== 0 && <ProductDisplay />}
                <RenderIvoices />
            </div>
        </div>
    );
}
