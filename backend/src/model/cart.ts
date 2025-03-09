import mongoose, { Schema, Document } from "mongoose";

interface ICartItem {
    productId: string;
    salePrice: number;
    quantity: number;
}

export interface ICart extends Document {
    userId: string;
    items: ICartItem[];
    totalPrice: number;
}

const CartSchema = new Schema<ICart>(
    {
        userId: { type: String, required: true, unique: true },
        items: [
            {
                productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
                salePrice: { required: true, type: Number },
                quantity: { type: Number, required: true, min: 1 },
            },
        ],
        totalPrice: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model<ICart>("Cart", CartSchema);
