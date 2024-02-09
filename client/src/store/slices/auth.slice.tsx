// Import necessary dependencies and hooks
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./notification.slice.tsx";
import API, { user_token } from "../services/api.service.tsx";
import { errorResponseFunction } from "../services/hooks.service.tsx";

export interface UserInterface {
    _id: string;
    name: string;
    email: string;
}

// Define initial state
export interface UserSliceDataType {
    isPending: boolean;
    isLoggedIn: boolean;
}

const initialState: UserSliceDataType = user_token ? {
    isLoggedIn: true,
    isPending: false,
} : {
    isPending: false,
    isLoggedIn: false,
};

// Define form data type
export interface FormDataType {
    username?: string;
    email: string;
    password: string;
    confirm_password?: string;
}

// Define register action
export const registerAction = createAsyncThunk(`auth/register`, async (formData: FormDataType, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await API.post(`/user/register`, formData);
        dispatch(setMessage({ message: data.message, status: data.status }));
        return data;
    } catch (error) {
        // Dispatching error message
        dispatch(setMessage(errorResponseFunction(error)));
        return rejectWithValue("Having some error while registration.");
    }
});

// Define login action
export const loginAction = createAsyncThunk(`auth/login`, async (formData: FormDataType, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await API.post(`/user/login`, formData);
        localStorage.setItem('access_token', data.data.access_token);
        dispatch(setMessage({ message: data.message, status: data.status }));
        return data.data;
    } catch (error) {
        dispatch(setMessage(errorResponseFunction(error)));
        return rejectWithValue("Having some error while registration.");
    }
});

// Create auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            localStorage.removeItem("access_token");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAction.pending, (state) => {
                state.isPending = true;
            })
            .addCase(registerAction.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.isPending = false;
            })
            .addCase(registerAction.rejected, (state) => {
                state.isLoggedIn = false;
                state.isPending = false;
            })
            .addCase(loginAction.pending, (state) => {
                state.isPending = true;
            })
            .addCase(loginAction.fulfilled, (state) => {
                state.isLoggedIn = true;
                state.isPending = false;
            })
            .addCase(loginAction.rejected, (state) => {
                state.isLoggedIn = false;
                state.isPending = false;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
