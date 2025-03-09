import { IInitialFormDataProps } from "@/app/admin/products/add/page";
import axiosInstance from "@/lib/axiosInstance";
import { handleAxiosError } from "@/lib/axiosInstanceError";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addNewProduct = createAsyncThunk('createProduct', async (formData: IInitialFormDataProps, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/api/v1/admin/product/addOne', { product: formData })
        return response.data
    } catch (error: unknown) {
        return handleAxiosError(error, rejectWithValue);
    }
})
export const deleteProduct = createAsyncThunk('deleteProduct', async (productId: string, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/admin/product/delete/${productId}`)
        return response.data
    } catch (error: unknown) {
        return handleAxiosError(error, rejectWithValue);
    }
})
export const getProductDetailsPyId = createAsyncThunk('getProductDetailsPyId', async (productId: string, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/api/v1/admin/product/get/${productId}`)
        return response.data
    } catch (error: unknown) {
        return handleAxiosError(error, rejectWithValue);
    }
})

export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
    const response = await axiosInstance('/api/v1/admin/product/getAll')
    return response.data
})