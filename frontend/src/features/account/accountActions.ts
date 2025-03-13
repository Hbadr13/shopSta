import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance"; // Assuming axiosInstance is set up
import { handleAxiosError } from "@/lib/axiosInstanceError"; // Your error handler for axios



interface AddressData {
    company: string;
    address1: string;
    address2?: string;
    city: string;
    country: string;
    province: string;
    postalCode: string;
    phone: string;
    isDefault: boolean;
}

interface UpdatedAddress extends AddressData {
    _id: string;
}

export const getUserProfile = createAsyncThunk(
    "account/getUserProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/v1/account/profile");
            return response.data;
        } catch (error: unknown) {
            return handleAxiosError(error, rejectWithValue);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    "account/updateUserProfile",
    async ({ firstName, lastName }: { firstName: string, lastName: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put("/api/v1/account/profile", { firstName, lastName });
            return response.data;
        } catch (error: unknown) {
            return handleAxiosError(error, rejectWithValue);
        }
    }
);

export const addAddress = createAsyncThunk(
    "account/addAddress",
    async (addressData: AddressData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/api/v1/account/address", addressData);
            return response.data;
        } catch (error: unknown) {
            return handleAxiosError(error, rejectWithValue);
        }
    }
);

export const deleteAddress = createAsyncThunk(
    "account/deleteAddress",
    async (addressId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/api/v1/account/address/${addressId}`);
            return response.data
        } catch (error: unknown) {
            return handleAxiosError(error, rejectWithValue);
        }
    }
);

export const updateAddress = createAsyncThunk(
    "account/updateAddress",
    async (updatedAddress: UpdatedAddress, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                `/api/v1/account/address/${updatedAddress._id}`,
                updatedAddress
            );
            return response.data;
        } catch (error: unknown) {
            return handleAxiosError(error, rejectWithValue);
        }
    }
);
