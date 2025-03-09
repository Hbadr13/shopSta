import Product from "../../model/product"
import { Request, Response } from "express"
export const getAllProductsShop = async (request: Request, response: Response): Promise<void> => {
    const products = await Product.find()
    response.status(200).json({
        seccess: true,
        products: products
    })
}
export const getProductByIdShop = async (request: Request, response: Response): Promise<void> => {
    try {
        const { id } = request.params
        const product = await Product.findById(id);
        if (!product || !id) {
            response.status(404).json({
                success: false,
                message: "Product not found",
            })
            return
        }
        response.status(200).json({
            product,
            seccess: true,
        })
    } catch (error) {
        response.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}