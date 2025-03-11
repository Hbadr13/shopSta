import { createSlice } from "@reduxjs/toolkit";
import { getfavorites, deleteProductFromFavorites, addProductTofavorites } from "./favorite.action";
import { Product } from "@/interface/IApiProducts";

interface FavoritesState {
    favorites: Product[];
    favoritesProductIds: string[];
    loadingStatus: string;
    error: string | null;
}

const initialState: FavoritesState = {
    favorites: [],
    favoritesProductIds: [],
    loadingStatus: '',
    error: null,
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getfavorites.pending, (state) => {
            state.loadingStatus = 'Loading favorites';
            state.error = null;
        });
        builder.addCase(getfavorites.fulfilled, (state, action) => {
            state.loadingStatus = 'Favorites loaded successfully';
            state.favorites = action.payload.favorites;
            state.favoritesProductIds = action.payload.favoritesProductIds;
        });
        builder.addCase(getfavorites.rejected, (state, action) => {
            state.loadingStatus = 'Failed to load favorites';
            state.error = action.payload as string;
        });

        builder.addCase(addProductTofavorites.pending, (state) => {
            state.loadingStatus = 'Adding product';
            state.error = null;
        });
        builder.addCase(addProductTofavorites.fulfilled, (state, action) => {
            state.loadingStatus = 'Product added';
            state.favorites.push(action.payload.favorite);
            state.favoritesProductIds.push(action.payload.productId);
        });
        builder.addCase(addProductTofavorites.rejected, (state, action) => {
            state.loadingStatus = 'Failed to add product';
            state.error = action.payload as string;
        });

        builder.addCase(deleteProductFromFavorites.pending, (state) => {
            state.loadingStatus = 'Removing product';
            state.error = null;
        });
        builder.addCase(deleteProductFromFavorites.fulfilled, (state, action) => {
            state.loadingStatus = 'Product removed';
            state.favorites = state.favorites.filter(
                (favorite) => favorite._id !== action.payload.productId
            );
            state.favoritesProductIds = state.favoritesProductIds.filter(
                (favoriteId) => favoriteId !== action.payload.productId
            );
        });
        builder.addCase(deleteProductFromFavorites.rejected, (state, action) => {
            state.loadingStatus = 'Failed to remove product';
            state.error = action.payload as string;
        });
    },
});

export default favoritesSlice.reducer;
