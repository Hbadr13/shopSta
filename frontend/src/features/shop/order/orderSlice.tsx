import { createSlice } from "@reduxjs/toolkit";
import { createYourOrder } from "./orderAction";
interface IinitialState {
    isLoading: boolean
}
const initialState: IinitialState = {
    isLoading: false
}
const shopOrderSlices = createSlice({
    name: 'shopOrder',
    reducers: {

    },
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createYourOrder.pending, () => {

        })
    }
})
export default shopOrderSlices.reducer

