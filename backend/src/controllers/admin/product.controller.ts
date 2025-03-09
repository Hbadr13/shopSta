import Product from "@model/product"
import { Request, Response } from "express"
// import { Cloudinary } from '@cloudinary/url-gen';
import cloudinary from 'cloudinary'

export const addNewProduct = async (request: Request, response: Response): Promise<void> => {
    const { product } = request.body
    const products = await Product.find()
    if (!request.user) {
        response.status(401).json({ message: "Unauthenticated user" });
        return;
    }

    const adminId = typeof request.user === "string"
        ? request.user
        : request.user._id;

    if (!adminId) {
        response.status(401).json({ message: "Missing Admin ID" });
        return;
    }
    const newProduct = new Product({
        adminId: adminId,
        title: product.title,
        shortDescription: product.category.replace('-', ' '),
        description: {
            text: product.description,
            details: [
                { label: 1, value: `Brand: ${product.brand}` },
                { label: 2, value: `Category: ${product.category.replace('-', ' ')}` },
                { label: 3, value: `Colors Available: ${product.colors.join(', ')}` },
                { label: 4, value: `Sizes Available: ${product.sizes.join(', ')}` }
            ]
        },
        price: product.price || 0,
        salePrice: product.salePrice || 0,
        category: product.category,
        audience: product.audience,
        brand: product.brand,
        quantity: product.quantity || 0,
        sizes: product.sizes,
        images: product.images,
        colors: product.colors,
        totalSale: 0,
        productID: !products ? 1 : products.length + 1,
        averageRating: 0,
        totalRating: 0
    });
    await newProduct.save()
    response.status(200).json({
        success: true,
    })
}



export const getAllProducts = async (request: Request, response: Response): Promise<void> => {
    const products = await Product.find()
    response.status(200).json({
        seccess: true,
        products: products
    })
}
export const getProductById = async (request: Request, response: Response): Promise<void> => {
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
export const deleteProduct = async (request: Request, response: Response): Promise<void> => {
    try {
        const { id } = request.params
        const product = await Product.findByIdAndDelete(id);
        if (!product || !id) {
            response.status(404).json({
                success: false,
                message: "Product not found",
            })
            return
        }
        const imagePubIds = product.images.map((url) => {
            const filename = url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."));
            return `shopsta/${filename}`;
        })
        cloudinary.v2.api.delete_resources(imagePubIds,
            { type: 'upload', resource_type: 'image' })
            .then();

        response.status(200).json({
            productId: id,
            seccess: true,
            message: 'Product delete successfully'
        })
    } catch (error) {
        response.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}