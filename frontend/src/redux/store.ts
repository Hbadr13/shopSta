import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import adminProductSlice from '../features/admin/productSlice'
import shopProductSlice from '../features/shop/productSlice'
import cartReducer from '../features/shop/cartSlice'
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist"
import shopOrderSlices from '@/features/shop/order/orderSlice'
import windowPropsSlice from '@/features/global/windowProps'
import favoriteSlice from '@/features/shop/favorite/favoriteSlice'
import popupSlice from '@/features/global/popupSlice'
import accountSlice from '@/features/account/accountSlice'
const persistConfig = {
    key: "cart",
    storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
    reducer: {
        cart: persistedCartReducer,
        auth: authReducer,
        adminProduct: adminProductSlice,
        shopProductSlice: shopProductSlice,
        shopOrderSlices: shopOrderSlices,
        windowPropsSlice: windowPropsSlice,
        favoriteSlice: favoriteSlice,
        popupSlice: popupSlice,
        account: accountSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
})
export default store
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;