import { addFavorite, getFavorites, removeFavorite } from "../../controllers/shop/favorite.controller";
import { Router } from "express";

const favoriteRouter = Router();

favoriteRouter.post("/add", addFavorite);
favoriteRouter.delete("/remove/:productId", removeFavorite);
favoriteRouter.get("/", getFavorites);

export default favoriteRouter;
