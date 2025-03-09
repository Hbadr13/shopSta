import axiosInstance from "@/lib/axiosInstance";
import { handleAxiosError } from "@/lib/axiosInstanceError";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getProductDetailsPyId = createAsyncThunk('getProductDetailsPyId', async (productId: string, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/api/v1/shop/product/get/${productId}`)
        return response.data
    } catch (error: unknown) {
        return handleAxiosError(error, rejectWithValue);
    }
})

export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
    const response = await axiosInstance('/api/v1/shop/product/getAll')
    return response.data
})