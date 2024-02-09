import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router-dom";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const navigate = () => useNavigate;

export interface ResponseError extends Error {
    response: {
        data: {
            message: Array<string>,
            status: string
        }
    }
}

export const errorResponseFunction = (error: unknown) => {
    console.log(error)
    const errorResponse = error as ResponseError;
    const errorMessage = errorResponse.response?.data?.message || 'Some Error Occurred!';
    const errorStatus = errorResponse.response?.data?.status || 'Failed';
    return { message: errorMessage, status: errorStatus }
}