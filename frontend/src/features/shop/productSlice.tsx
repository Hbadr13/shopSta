import { createSlice } from "@reduxjs/toolkit";
import { IApiProducts, Product } from "@/interface/IApiProducts";
import { getAllProducts, getProductDetailsPyId } from "./productAction";

interface IinitialState {
    isLoading: boolean,
    productList: null | IApiProducts,
    productDetails: null | Product,
};
const initialState: IinitialState = {
    isLoading: true,
    productList: null,
    productDetails: null,
};

const shopProductSlice = createSlice({
    name: 'shopProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductDetailsPyId.pending, (state) => {
            state.isLoading = true

        }).addCase(getProductDetailsPyId.rejected, (state) => {
            state.isLoading = false

        }).addCase(getProductDetailsPyId.fulfilled, (state, action) => {
            state.isLoading = false
            state.productDetails = action.payload.product
        }).addCase(getAllProducts.pending, (state) => {
            state.isLoading = true

        }).addCase(getAllProducts.rejected, (state) => {
            state.productList = null
            state.isLoading = false
        }).addCase(getAllProducts.fulfilled, (state, action) => {
            state.productList = action.payload
            state.isLoading = false

        })
    }
})

export default shopProductSlice.reducer