import { useEffect } from 'react';
import { getInvoices } from '../store/slices/invoice.slice';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/services/hooks.service';

const RenderIvoices = () => {
    const dispatch = useAppDispatch();
    const { invoices, isPending, isError } = useAppSelector((state) => state.inoviceState);

    useEffect(() => {
        dispatch(getInvoices());
    }, [dispatch])

    const getDate = (date: string | undefined) => {
        if (date) return new Date(date).toLocaleDateString();
    }

    if (isPending) {
        return (
            <div className='text-white text-center'>Loading...</div>
        )
    }

    if (isError) {
        return (
            <div className='text-white text-center'>Invoices Not Found...</div>
        )
    }

    if (invoices.length === 0) {
        return <></>
    }

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md p-4 mt-8">
            <h1 className='text-2xl font-bold pb-4 text-gray-800'>Invoices History</h1>
            <div className="overflow-x-auto">
                <table className="w-full min-w-md">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Invoice Id</th>
                            <th className="py-2 px-4 border-b">Date</th>
                            <th className="py-2 px-4 border-b">Grand Total</th>
                            <th className="py-2 px-4 border-b">Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((item, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b text-center">{item._id}</td>
                                <td className="py-2 px-4 border-b text-center">{getDate(item.invoice_date)}</td>
                                <td className="py-2 px-4 border-b text-center">₹{item.after_gst_amount}</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <Link to={`/invoice/${item._id}`} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                                        Download
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RenderIvoices;
