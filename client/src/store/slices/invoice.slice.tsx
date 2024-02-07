import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import API from "../services/api.service"
import { setMessage } from "./notification.slice";
import { ProductDataType } from "./product.slice";

export interface InvoiceDataType {
    valid_date?: string;
    invoice_date?: string;
    _id?: string;
    products: ProductDataType[];
    total_amount: number;
    after_gst_amount: number;
}

export interface InvoiceSlice {
    selectedInvoiceId: string | null;
    invoices: InvoiceDataType[];
    isPending: boolean;
    isError: boolean;
}


const initialState: InvoiceSlice = {
    selectedInvoiceId: null,
    invoices: [],
    isPending: false,
    isError: false
}

export const postInvoice = createAsyncThunk('invoice/post', async (invoice: InvoiceDataType, { dispatch }) => {
    try {
        const { data } = await API.post("/invoice/add", invoice);
        dispatch(getInvoices());
        dispatch(setMessage({ message: data.message, status: data.status }));
        return data.data;
    } catch (error) {
        const responseData = error.response.data as { message: string, status: string };
        dispatch(setMessage({ message: responseData.message, status: responseData.status }));
    }
})


export const getInvoices = createAsyncThunk('invoices/get', async (_, { dispatch }) => {
    try {
        const { data } = await API.get('invoice/get');
        dispatch(setMessage({ message: data.message, status: data.status }));
        return data.data;
    } catch (error) {
        dispatch(setMessage({ message: error.response.data.message, status: error.response.data.status }));
    }
})

const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {
        clearSelectedInvoiceId: (state) => {
            state.selectedInvoiceId = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postInvoice.pending, (state) => {
            state.isPending = true;
            state.isError = false;
        })
        builder.addCase(postInvoice.fulfilled, (state, { payload }) => {
            state.selectedInvoiceId = payload.invoice_id;
            state.isPending = false;
            state.isError = false;
        })
        builder.addCase(postInvoice.rejected, (state) => {
            state.isPending = false;
            state.isError = true;
        })
        builder.addCase(getInvoices.pending, (state) => {
            state.isPending = true;
            state.isError = false;
        })
        builder.addCase(getInvoices.fulfilled, (state, { payload }) => {
            state.invoices = payload.invoice;
            state.isPending = false;
            state.isError = false;
        })
        builder.addCase(getInvoices.rejected, (state) => {
            state.isPending = false;
            state.isError = true;
        })
    }
})

export const { clearSelectedInvoiceId } = invoiceSlice.actions;
export default invoiceSlice.reducer;