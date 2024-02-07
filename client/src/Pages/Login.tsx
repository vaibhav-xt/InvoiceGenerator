import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FormDataType, loginAction } from '../store/slices/auth.slice';
import { Link, useNavigate } from 'react-router-dom';
import AlertComponent from '../compoenents/AlertComponent';
import { useAppDispatch, useAppSelector } from '../store/services/hooks.service';

const Login = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const { isPending, isLoggedIn } = useAppSelector((state) => state.authState)

    const [formData, setFormData] = useState<FormDataType>({
        email: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginAction(formData));
    };



    useEffect(() => {
        if (isLoggedIn) {
            navigate("/")
            setFormData({
                username: '',
                email: '',
                password: '',
                confirm_password: ""
            })
        }

        return () => {
            setFormData({
                username: '',
                email: '',
                password: '',
                confirm_password: ""
            })
        }
    }, [isLoggedIn, navigate])


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
            <AlertComponent />
            <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        {isPending ? "Login..." : "Login"}
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-600">
                    Don't have an account? <Link to="/register" className="text-blue-500">Sign Up here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
