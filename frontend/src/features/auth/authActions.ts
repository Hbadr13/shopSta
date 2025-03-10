import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";
import { handleAxiosError } from "@/lib/axiosInstanceError";



export const registerUser = createAsyncThunk("register", async ({ email, userName, password }: { email: string, userName: string, password: string }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/api/v1/auth/register", { email, userName, password })
        return response.data;
    } catch (error: unknown) {
        return handleAxiosError(error, rejectWithValue);
    }
});

export const loginUser = createAsyncThunk("login", async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/api/v1/auth/login", { email, password });
        return response.data;
    } catch (error: unknown) {
        return handleAxiosError(error, rejectWithValue);
    }
});

export const logout = createAsyncThunk('logout', async () => {
    const response = await axiosInstance.post('/api/v1/auth/logout');
    return response.data;
})

// export const checkAuth = createAsyncThunk(
//     "/auth/checkauth",

//     async () => {
//         const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
//         const response = await axios.get(
//             `${baseURL}/api/v1/auth/check-auth`,
//             {
//                 withCredentials: true,
//                 headers: {
//                     "Cache-Control":
//                         "no-store, no-cache, must-revalidate, proxy-revalidate",
//                 },
//             }
//         );

//         return response.data;
//     }
// );

export const checkAuth = createAsyncThunk(
    "/auth/checkauth",
    async () => {
        const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

        const response = await fetch(`${baseURL}/api/v1/auth/check-auth`, {
            method: "GET",
            credentials: "include", // Ensure cookies are sent
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch auth data');
        }

        return response.json(); // Parse and return the response as JSON
    }
);
