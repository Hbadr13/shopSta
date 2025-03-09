import axiosInstance from "@/lib/axiosInstance";
import { handleAxiosError } from "@/lib/axiosInstanceError";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getfavorites = createAsyncThunk('getfavorites', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/api/v1/shop/favorites`)
        return response.data
    } catch (error: unknown) {
        return handleAxiosError(error, rejectWithValue);
    }
})

export const addProductTofavorites = createAsyncThunk('addProductTofavorites', async ({ productId }: { productId: string }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/api/v1/shop/favorites/add`, { productId })
        return response.data
    } catch (error: unknown) {
        return handleAxiosError(error, rejectWithValue);
    }
})



export const deleteProductFromFavorites = createAsyncThunk('deleteProductFromFavorites', async ({ productId }: { productId: string }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/shop/favorites/remove/${productId}`)
        return response.data
    } catch (error: unknown) {
        return handleAxiosError(error, rejectWithValue);
    }
})


