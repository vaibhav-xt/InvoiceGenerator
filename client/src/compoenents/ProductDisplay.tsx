import { useEffect } from "react";
import { ProductDataType, clearProductState, removeProduct } from "../store/slices/product.slice";
import { setMessage } from "../store/slices/notification.slice";
import { useNavigate } from "react-router-dom";
import { clearSelectedInvoiceId, postInvoice } from "../store/slices/invoice.slice";
import { useAppDispatch, useAppSelector } from "../store/services/hooks.service";

export default function ProductDisplay() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { products, total_amount, after_gst_amount } = useAppSelector(state => state.productState);
    const { selectedInvoiceId } = useAppSelector(state => state.inoviceState);

    const handleDelete = (index: number) => {
        dispatch(removeProduct(index));
        dispatch(setMessage({ status: "Success", message: ["Product deleted."] }));
    };

    const toInvoicePage = () => {
        dispatch(postInvoice({ products, total_amount, after_gst_amount }));
    }

    useEffect(() => {
        if (products && selectedInvoiceId) {
            navigate(`/invoice/${selectedInvoiceId}`);
            dispatch(clearSelectedInvoiceId());
            dispatch(clearProductState());
        }
    }, [selectedInvoiceId])

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md p-4">
            <div className="overflow-x-auto">
                <table className="w-full min-w-md">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Product Name</th>
                            <th className="py-2 px-4 border-b">Product Quantity</th>
                            <th className="py-2 px-4 border-b">Product Rate</th>
                            <th className="py-2 px-4 border-b">Total Amount</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item: ProductDataType, index: number) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b text-center">{item.productName}</td>
                                <td className="py-2 px-4 border-b text-center">{item.productQty}</td>
                                <td className="py-2 px-4 border-b text-center">₹{item.productRate}</td>
                                <td className="py-2 px-4 border-b text-center">₹{item.productQty * item.productRate}</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => handleDelete(index)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:justify-between mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={toInvoicePage}>
                    Generate Invoice
                </button>
                <div>
                    <p className="text-start text-sm sm:text-end ">
                        <span className="font-bold">Total Amount: </span> ₹{total_amount}
                    </p>
                    <p className="text-start text-sm sm:text-end ">
                        <span className="font-bold">Grant Total Amount (GST 18%): </span>₹{after_gst_amount}
                    </p>
                </div>
            </div>
        </div>
    );
}
