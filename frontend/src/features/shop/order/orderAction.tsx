import axiosInstance from "@/lib/axiosInstance";
import { handleAxiosError } from "@/lib/axiosInstanceError";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface ICreateYourOrder {
    cartItems: Array<{
        productId: string
        title: string
        image: string
        price: number
        quantity: number
        brand: string
    }>
    paymentDetails: {
        cardNumber: string
        expiryDate: string
        cvv: string
    },
    addressInfo: {
        address: string,
        city: string
        pincode: string
        phone: string
        notes: string
    }
    paymentMethod: string
    totalAmount: number
    totalItems: number
}
export const createYourOrder = createAsyncThunk('createOrder', async ({ cartItems, addressInfo, paymentMethod, totalAmount, totalItems, paymentDetails }: ICreateYourOrder, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/api/v1/shop/order/create`, { cartItems, addressInfo, paymentMethod, totalAmount, totalItems, paymentDetails })
        return response.data
    } catch (error: unknown) {
        return handleAxiosError(error, rejectWithValue);
    }
})

export const getConfirmationOfOrder = createAsyncThunk(
    'getConfirmationOrder',
    async ({ orderId }: { orderId: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/v1/shop/order/Confirmation/get/${orderId}`);
            return response.data;
        } catch (error: unknown) {
            return handleAxiosError(error, rejectWithValue);
        }
    }
);
export const getAllOrders = createAsyncThunk('getAllOrders', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/api/v1/shop/order/getAll`)
        return response.data
    } catch (error: unknown) {
        return handleAxiosError(error, rejectWithValue);
    }
})


export const payTheOrder = createAsyncThunk('payTheOrder', async ({ orderId, paymentStatus }: { orderId: string, paymentStatus: string }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`/api/v1/shop/order/pay/${orderId}`, { paymentStatus })
        return response.data
    } catch (error: unknown) {
        return handleAxiosError(error, rejectWithValue);
    }
})
