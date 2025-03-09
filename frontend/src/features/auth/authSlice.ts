import { createSlice } from '@reduxjs/toolkit'
import { checkAuth, loginUser, logout, registerUser } from './authActions';


interface AuthState {
    user: null | { id: string; userName: string; email: string; role: string };
    isLoading: boolean;
    error: null | string;
    isAuthenticated: boolean
}

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;

            }).addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = action.payload.success
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            }).addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.isAuthenticated = false
                state.isLoading = false
            })
            .addCase(logout.rejected, () => {

            })
    },
})

// export const { logout, setUser } = authSlice.actions
export default authSlice.reducer