import { createSlice } from "@reduxjs/toolkit";
import { InvoiceDataType } from "./invoice.slice";

export interface ProductDataType {
    productName: string;
    productQty: number;
    productRate: number;
}

export const initialState: InvoiceDataType = {
    products: [],
    total_amount: 0,
    after_gst_amount: 0,
    valid_date: ""
};

const calculateTotalAmount = (products: InvoiceDataType["products"]) => {
    return products.reduce((total, product) => {
        return total + product.productQty * product.productRate;
    }, 0);
};

const calculateAfterGSTAmount = (totalAmount: number): number => {
    const gstRate = 0.18; // 18 percent GST
    return Number((totalAmount * (1 + gstRate)).toFixed(0));
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, { payload }) => {
            state.products = [...state.products, payload];
            state.total_amount = calculateTotalAmount(state.products);
            state.after_gst_amount = calculateAfterGSTAmount(state.total_amount);
        },

        removeProduct: (state, { payload }) => {
            const newProducts = state.products.filter((_, index) => index !== payload);
            state.products = newProducts;
            state.total_amount = calculateTotalAmount(state.products);
            state.after_gst_amount = calculateAfterGSTAmount(state.total_amount)
        },

        clearProductState: (state) => {
            state.products = [];
            state.after_gst_amount = 0;
            state.total_amount = 0;
        }
    },
});

export const { addProduct, removeProduct, clearProductState } = productSlice.actions;
export default productSlice.reducer;
