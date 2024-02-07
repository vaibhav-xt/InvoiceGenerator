import { createSlice } from "@reduxjs/toolkit";

// Message Interface
export interface NotificationSlice {
    isAlert: boolean;
    messages: string[];
    status: string;
}

const initialState: NotificationSlice = {
    isAlert: false,
    messages: [],
    status: ""
}

// message slice
const messageSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        //Actions
        setMessage: (state, action) => {
            return {
                ...state,
                isAlert: true,
                messages: action.payload.message,
                status: action.payload.status
            }
        },
        //Actions
        clearMessage: (state) => {
            return {
                ...state,
                isAlert: false,
                messages: [],
                status: ""
            }
        }
    }
})

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
