import axiosInstance from "@/lib/axiosInstance";
import { handleAxiosError } from "@/lib/axiosInstanceError";
import { createAsyncThunk } from "@reduxjs/toolkit";


// export const deleteProduct = createAsyncThunk('deleteProduct', async (productId: string, { rejectWithValue }) => {
//     try {
//         const response = await axiosInstance.delete(`/api/v1/admin/product/delete/${productId}`)
//         return response.data
//     } catch (error: unknown) {
//         return handleAxiosError(error, rejectWithValue);
//     }
// })
// export const getProductDetailsPyId = createAsyncThunk('getProductDetailsPyId', async (productId: string, { rejectWithValue }) => {
//     try {
//         const response = await axiosInstance.get(`/api/v1/admin/product/get/${productId}`)
//         return response.data
//     } catch (error: unknown) {
//         return handleAxiosError(error, rejectWithValue);
//     }
// })
export const changeOrderStatus = createAsyncThunk('ChangeOrderStatus', async ({ orderId, status }: { orderId: string, status: string }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/api/v1/admin/orders/edit/orderStatus', { orderId, status })
        return response.data
    } catch (error: unknown) {
        return handleAxiosError(error, rejectWithValue);
    }
})
export const getAllProductsByAdmin = createAsyncThunk('getAllProductsByAdmin', async () => {
    const response = await axiosInstance('/api/v1/admin/orders/getAll')
    return response.data
})