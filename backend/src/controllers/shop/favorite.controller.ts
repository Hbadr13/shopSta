import Favorite from "@model/Favorite";
import Product from "@model/product";
import { Request, Response } from "express";

export const addFavorite = async (request: Request, response: Response): Promise<any> => {
    try {
        const { productId } = request.body;
        if (!request.user) {
            response.status(401).json({ success: false, message: "Unauthenticated user" });
            return;
        }
        const userId = typeof request.user === "string" ? request.user : request.user._id;
        const product = await Product.find({ productId });
        if (!product) {
            return response.status(404).json({ success: false, message: "Product not found" });
        }
        const existingFavorite = await Favorite.findOne({ userId, productId });
        if (existingFavorite) {
            return response.status(400).json({ success: false, message: "Product already in favorites" });
        }

        const favorite = new Favorite({ userId, productId });
        await favorite.save();
        response.status(201).json({ message: "Added to favorites", favorite: product, productId });
    } catch (error) {
        response.status(500).json({ message: "Server error", error });
    }
};

export const removeFavorite = async (request: Request, response: Response): Promise<any> => {
    try {
        const { productId } = request.params;
        if (!request.user) {
            response.status(401).json({ success: false, message: "Unauthenticated user" });
            return;
        }
        const userId = typeof request.user === "string" ? request.user : request.user._id;

        const deletedFavorite = await Favorite.findOneAndDelete({ userId, productId });
        if (!deletedFavorite) {
            return response.status(404).json({ message: "Product not found in favorites" });
        }

        response.json({ productId, message: "Removed from favorites" });
    } catch (error) {
        response.status(500).json({ message: "Server error", error });
    }
};


export const getFavorites = async (request: Request, response: Response): Promise<void> => {
    try {
        if (!request.user) {
            response.status(401).json({ success: false, message: "Unauthenticated user" });
            return
        }
        const userId = typeof request.user === "string" ? request.user : request.user._id;
        const favoritesProductIds = await Favorite.find({ userId }).select("productId");
        if (favoritesProductIds.length === 0) {
            response.status(200).json({ success: true, favorites: [], favoritesProductIds: [] });
            return
        }
        const productIds = favoritesProductIds.map((favorite) => favorite.productId);
        const favorites = await Product.find({ _id: { $in: productIds } });
        response.json({ success: true, favorites, favoritesProductIds: productIds });
        return

    } catch (error) {
        response.status(500).json({ success: false, message: "Server error", error });
        return
    }
};
