import { createSlice } from "@reduxjs/toolkit";
import { getUserProfile, updateUserProfile, addAddress, deleteAddress, updateAddress } from "./accountActions";

export interface AddressData {
    _id: string;
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

export interface Account {
    _id: string;
    firstName: string;
    lastName?: string;
    phoneNumber?: string;
    email: string;
    role: string;
    addresses: AddressData[];
}

interface AccountState {
    account: Account | null;
    isLoading: boolean;
    error: string | null;
    message: string

}

const initialState: AccountState = {
    account: null,
    isLoading: false,
    error: null,
    message: ''
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.account = action.payload.account;
            })
            .addCase(getUserProfile.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                if (state.account) {
                    state.account = action.payload.account
                }
                state.message = action.payload.message;

            })
            .addCase(updateUserProfile.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                if (state.account) {
                    state.account = action.payload.account
                    state.message = action.payload.message;

                }
            })
            .addCase(addAddress.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                if (state.account) {
                    state.account.addresses = state.account.addresses.filter(
                        (addr) => addr._id !== action.payload.addressId
                    )

                }
                // state.account = action.payload.account;
                state.message = action.payload.message;
                state.isLoading = false;

            })
            .addCase(deleteAddress.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(updateAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                if (state.account) {
                    state.account.addresses = action.payload.addresses
                }
                state.message = action.payload.message;
                state.isLoading = false;

            })
            .addCase(updateAddress.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default accountSlice.reducer;
