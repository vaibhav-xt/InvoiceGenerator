import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useParams } from "react-router-dom";
import { setMessage } from "../store/slices/notification.slice";
import AlertComponent from "../compoenents/AlertComponent";
import { useAppDispatch, useAppSelector } from "../store/services/hooks.service";
import { InvoiceDataType } from "../store/slices/invoice.slice";
import { ProductDataType } from "../store/slices/product.slice";


export default function Invoice() {
    const { _id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [flag, setFlag] = useState({
        isPending: true,
        isNotFound: false
    })
    const { isLoggedIn } = useAppSelector((state) => state.authState);
    const { invoices } = useAppSelector((state) => state.inoviceState);
    const [localInvoice, setLocalInvoice] = useState<InvoiceDataType | null>(null);
    const pdfRef = useRef<HTMLDivElement | null>(null);

    // generate pdf
    const generatePDF = useReactToPrint({
        content: () => pdfRef.current,
        documentTitle: `invoice-${_id}`,
        onBeforePrint: () => {
            if (!localInvoice) {
                dispatch(
                    setMessage({
                        message: ["Invoice data not available"],
                        status: "Error",
                    })
                );
            }
        },
        onAfterPrint: () =>
            dispatch(
                setMessage({ message: ["Data saved in PDF"], status: "Success" })
            ),
    });

    // Filter invoices based on the provided ID
    useEffect(() => {
        const selectedInvoice = invoices.find((invoice: InvoiceDataType) => invoice._id === _id) || null;
        if (selectedInvoice) {
            setLocalInvoice(selectedInvoice);
            setFlag({ isNotFound: false, isPending: false })
        } else {
            setFlag({ isNotFound: true, isPending: false })

        }

        if (flag.isNotFound && !flag.isPending) {
            dispatch(setMessage({ status: "Failed", message: ["Invoice Not found."] }))
        }
    }, [localInvoice, invoices]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="bg-gray-900 min-h-screen w-full py-8 px-4">
            <AlertComponent />
            {flag.isPending && !flag.isNotFound && (<p className="text-center text-xl text-white">Loading...</p>)}
            {flag.isNotFound && !flag.isPending && <p className="text-center text-xl text-red-500">Invoice not found with this id: {_id}</p>}
            {!flag.isPending && !flag.isNotFound && (
                <>
                    <button
                        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 p-4 px-8 rounded-full font-bold text-xl text-white shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition-transform transform hover:scale-105"
                        onClick={generatePDF}
                    >
                        Download &#x2913;
                    </button>
                    <div
                        className="min-w-sm max-w-4xl w-full bg-white mx-auto p-4 text-gray-600 flex flex-col rounded-xl overflow-x-auto"
                        ref={pdfRef}
                    >
                        {/* header  */}
                        <div className="flex items-center justify-between">
                            <p>
                                <span className="text-3xl font-bold">Invoice Generator</span> <br />
                                <span>
                                    <span className="font-bold">Invoice Id: </span>
                                    {_id}
                                </span>
                            </p>
                            <img
                                src="https://levitation.in/wp-content/uploads/2023/04/levitation-Infotech.png"
                                alt="logo"
                                className="grayscale h-20"
                            />
                        </div>

                        <table className="w-full min-w-md mt-12 mb-8">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Product Name</th>
                                    <th className="py-2 px-4 border-b">Product Quantity</th>
                                    <th className="py-2 px-4 border-b">Product Rate</th>
                                    <th className="py-2 px-4 border-b">Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {localInvoice &&
                                    localInvoice.products.map((item: ProductDataType, index: number) => (
                                        <tr key={index}>
                                            <td className="py-4 px-4 border-b text-center">
                                                {item.productName}
                                            </td>
                                            <td className="py-4 px-4 border-b text-center">
                                                {item.productQty}
                                            </td>
                                            <td className="py-4 px-4 border-b text-center">
                                                ₹{item.productRate}
                                            </td>
                                            <td className="py-4 px-4 border-b text-center">
                                                ₹{item.productQty * item.productRate}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                        {/* Grand Total  */}
                        <div className="w-full sm:w-80 self-end text-gray-600 px-8">
                            <p className="flex justify-between">
                                <span className="font-bold">Total</span>{" "}
                                <span>₹{localInvoice?.total_amount}</span>
                            </p>
                            <p className="flex justify-between">
                                <span>GST</span> <span>18%</span>
                            </p>
                            <p className="flex justify-between my-2 py-4 border-t border-b">
                                <span className="font-bold">Grand Total</span>{" "}
                                <span className="text-blue-800">
                                    ₹{localInvoice?.after_gst_amount}
                                </span>
                            </p>
                            <p className="pb-12 text-end">
                                Valid Till: {localInvoice?.valid_date && new Date(localInvoice.valid_date).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="mt-8 bg-gray-950 text-white rounded-full px-16 py-8 mx-auto text-sm">
                            <p className="font-bold">Term and Conditions: </p>
                            <p>
                                We are happy to supply and further information you may need and
                                trust that you call on us to fill your order. Which will receive
                                your form prompt and careful attention.
                            </p>
                        </div>
                    </div>
                </>
            )

            }
        </div >
    );
}
