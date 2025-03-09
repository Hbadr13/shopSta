import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface CartState {
    windowWidth: number;
    windowHeight: boolean,
}

const initialState: CartState = {
    windowWidth: 0,
    windowHeight: false,
};

const windowPropsSlice = createSlice({
    name: "window",
    initialState,
    reducers: {
        setWindowWidth: (state, action: PayloadAction<number>) => {
            state.windowWidth = action.payload;
        },

    },
});

export const { setWindowWidth } = windowPropsSlice.actions;
export default windowPropsSlice.reducer;
