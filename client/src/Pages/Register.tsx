// Registration.jsx
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FormDataType, registerAction } from '../store/slices/auth.slice';
import { Link, useNavigate } from 'react-router-dom';
import AlertComponent from '../compoenents/AlertComponent';
import { useAppDispatch, useAppSelector } from '../store/services/hooks.service';
import { user_token } from '../store/services/api.service';

const Registration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormDataType>({
        username: '',
        email: '',
        password: '',
        confirm_password: ""
    });
    const dispatch = useAppDispatch();
    const { status } = useAppSelector((state) => state.notificationState);
    const { isPending } = useAppSelector((state) => state.authState);

    // handle on change 
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // form submit
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== formData.confirm_password) {
            alert('Passwords do not match');
            return;
        }

        // Validate email using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Invalid email address');
            return;
        }

        dispatch(registerAction(formData));
    };


    useEffect(() => {
        if (user_token) {
            navigate("/")
        }
    }, [navigate])

    useEffect(() => {
        if (status === "Success") {
            navigate("/login")
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
    }, [status, navigate])


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
            <AlertComponent />
            <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Registration</h2>
                <form onSubmit={handleSubmit} method='POST'>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="text"
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
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        {isPending ? "Registering..." : "Register"}
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Registration;
