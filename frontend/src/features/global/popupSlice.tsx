import { createSlice } from "@reduxjs/toolkit";

interface PopupState {
    isPopupVisible: boolean;
}

const initialState: PopupState = {
    isPopupVisible: typeof window !== "undefined"
        ? localStorage.getItem("hidePopup") !== "true"
        : true,
};

const popupSlice = createSlice({
    name: "popup",
    initialState,
    reducers: {
        hidePopup(state) {
            state.isPopupVisible = false;
            localStorage.setItem("hidePopup", "true");
        },
    },
});

export const { hidePopup } = popupSlice.actions;
export default popupSlice.reducer;
