import { getAllProductsShop, getProductByIdShop } from "@controllers/shop/shop.controller"
import { Router } from "express"

const shopRouter = Router()

shopRouter.get('/product/getAll', getAllProductsShop)
shopRouter.get('/product/get/:id', getProductByIdShop)
export default shopRouter
