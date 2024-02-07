import { useState, ChangeEvent, FormEvent, Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/slices/product.slice';
import { setMessage } from '../store/slices/notification.slice';

interface ProductProps {
    setDisplayForm: Dispatch<SetStateAction<boolean>>
}

interface FormState {
    productName: string;
    productQty: string;
    productRate: string;
}

export default function AddProductForm({ setDisplayForm }: ProductProps) {
    const [formState, setFormState] = useState<FormState>({
        productName: '',
        productQty: '',
        productRate: '',
    });
    const dispatch = useDispatch();

    // form handle
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    // form submit 
    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        if (formState.productName && formState.productQty && formState.productRate) {
            dispatch(addProduct(formState));
            dispatch(setMessage({ status: "Success", message: ["Product added."] }))
            setFormState({
                productName: "",
                productQty: "",
                productRate: ""
            })
        }
    };

    // close form
    const close = (e: React.MouseEvent<HTMLDivElement>): void => {
        const { tagName, classList } = e.target as HTMLDivElement;
        if (tagName === "DIV" && classList.contains('main-container')) {
            setDisplayForm(false);
        }
    };

    return (
        <div className='w-screen h-screen fixed top-0 left-0 main-container bg-[#1717174d]' onClick={close}>
            <form className="p-8 max-w-md w-full mx-auto bg-white rounded shadow-md mt-8" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold mb-4">Add Product</h1>

                <div className="mb-4">
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-600">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        value={formState.productName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="productQty" className="block text-sm font-medium text-gray-600">
                        Product Qty
                    </label>
                    <input
                        type="number"
                        id="productQty"
                        name="productQty"
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        value={formState.productQty}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="productRate" className="block text-sm font-medium text-gray-600">
                        Product Rate
                    </label>
                    <input
                        type="number"
                        id="productRate"
                        name="productRate"
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        value={formState.productRate}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
