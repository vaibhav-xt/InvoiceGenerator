import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/auth.slice';
import notificationSlice from "./slices/notification.slice";
import productSlice from "./slices/product.slice";
import invoiceSlice from "./slices/invoice.slice";

const reducer = {
    authState: authSlice,
    notificationState: notificationSlice,
    productState: productSlice,
    inoviceState: invoiceSlice
}

const store = configureStore({ reducer });


export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;