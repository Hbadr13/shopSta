import { createSlice } from "@reduxjs/toolkit";
import IOrder from "@/interface/IOrder";
import { changeOrderStatus, getAllProductsByAdmin } from "./ordersActions";

interface IinitialState {
    isLoading: boolean,
    ordersList: null | IOrder[],
    orderDetails: null | IOrder,
};
const initialState: IinitialState = {
    isLoading: false,
    ordersList: null,
    orderDetails: null,
};

const adminOrdersSlice = createSlice({
    name: 'adminOrders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProductsByAdmin.pending, (state) => {
            state.isLoading = true

        }).addCase(getAllProductsByAdmin.rejected, (state) => {
            state.ordersList = null
            state.isLoading = false
        }).addCase(getAllProductsByAdmin.fulfilled, (state, action) => {
            state.ordersList = action.payload.orders
            state.isLoading = false

        }).addCase(changeOrderStatus.pending, () => {

        }).addCase(changeOrderStatus.rejected, (state) => {
            state.ordersList = null
        }).addCase(changeOrderStatus.fulfilled, (state, action) => {
            state.ordersList = action.payload.orders

        })
    }
})

export default adminOrdersSlice.reducer