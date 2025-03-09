import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        adminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        },
        title: String,
        shortDescription: String,
        description: {
            text: String,
            details: [
                {
                    label: String,
                    value: String,
                },
            ],
        },
        audience: String,
        category: String,
        brand: String,
        price: String,
        salePrice: Number,
        quantity: Number,
        sizes: [String],
        images: [String],
        colors: [String],
        totalSale: Number,
        productID: Number,
        averageRating: Number,
        totalRating: Number
    },
    { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)
export default Product
