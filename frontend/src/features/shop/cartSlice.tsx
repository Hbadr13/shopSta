import { Product } from "@/interface/IApiProducts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    id: number
    product: Product
    quantity: number
    size: string
    color: string
    brand: string
}

interface CartState {
    cart: CartItem[];
    openCartPopup: boolean,
    id: number
}

const initialState: CartState = {
    cart: [],
    openCartPopup: false,
    id: 0

};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setOpenCartPopup: (state, action: PayloadAction<boolean>) => {
            state.openCartPopup = action.payload;
        },
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.cart.push({ ...action.payload });
            // state.cart.length += 1
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.cart.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity
            }
        },
        clearCart: (state) => {
            state.cart = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart, setOpenCartPopup, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
