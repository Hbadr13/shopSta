import { createSlice } from "@reduxjs/toolkit";
import { deleteProduct, getAllProducts, getProductDetailsPyId } from "./productActions";
import { IApiProducts, Product } from "@/interface/IApiProducts";

interface IinitialState {
    isLoading: boolean,
    productList: null | IApiProducts,
    productDetails: null | Product,
};
const initialState: IinitialState = {
    isLoading: false,
    productList: null,
    productDetails: null,
};

const adminProductSlice = createSlice({
    name: 'adminProduct',
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

        }).addCase(deleteProduct.fulfilled, (state, action) => {
            if (state.productList && state.productList.products && action.payload) {
                state.productList.products = state.productList.products.filter((prd) => prd._id != action.payload.productId)
            }
        })
    }
})

export default adminProductSlice.reducer