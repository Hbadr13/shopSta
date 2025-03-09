import mongoose, { Document, Schema } from 'mongoose';

interface CartItem {
    productId: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
}

interface AddressInfo {
    address: string;
    city: string;
    pincode: string;
    phone: string;
    notes: string;
}

interface PaymentDetails {
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
}

export interface Order extends Document {
    userId: string;
    cartItems: CartItem[];
    addressInfo: AddressInfo;
    orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paymentMethod: 'cod' | 'paypal' | 'stripe' | 'credit_card';
    paymentDetails: PaymentDetails;
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    totalAmount: number;
    totalItems: number;
    paymentId: string;
    payerId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const OrderSchema = new Schema<Order>(
    {
        userId: {
            type: String,
            ref: "User",
            required: true,
        },
        cartItems: [
            {
                productId: {
                    type: String,
                    ref: "Product",
                    required: true,
                },
                title: { type: String, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true, min: 1 },
            },
        ],
        addressInfo: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            pincode: { type: String, required: true },
            phone: { type: String, required: true },
            notes: { type: String, default: "" },
        },
        orderStatus: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
        paymentMethod: {
            type: String,
            enum: ["cod", "paypal", "stripe", "credit_card"],
            required: true,
        },
        paymentDetails: {
            cardNumber: { type: String, validate: { validator: function (this: any) { return this.paymentMethod === "credit_card"; }, message: "Card number required for credit card payments" } },
            expiryDate: { type: String, validate: { validator: function (this: any) { return this.paymentMethod === "credit_card"; }, message: "Expiry date required for credit card payments" } },
            cvv: { type: String, validate: { validator: function (this: any) { return this.paymentMethod === "credit_card"; }, message: "CVV required for credit card payments" } },
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed", "refunded"],
            default: "pending",
        },
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        totalItems: {
            type: Number,
            required: true,
            min: 0,
        },
        paymentId: { type: String, default: "" },
        payerId: { type: String, default: "" },
    },
    { timestamps: true }
);

const Order = mongoose.model<Order>("Order", OrderSchema);
export default Order;
