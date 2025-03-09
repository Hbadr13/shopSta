
interface ICartItem {
    productId: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
    _id: string;
}

interface IAddressInfo {
    address: string;
    city: string;
    pincode: string;
    phone: string;
    notes?: string;
}

interface IPaymentDetails {
    cardNumber: string;
    expiryDate: string;
}

interface IOrder {
    _id: string;
    userId: string;
    cartItems: ICartItem[];
    addressInfo: IAddressInfo;
    orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    paymentMethod: "cod" | "paypal" | "stripe" | "credit_card";
    paymentDetails?: IPaymentDetails;
    paymentStatus: "pending" | "paid" | "failed" | "refunded";
    totalAmount: number;
    totalItems: number;
    paymentId: string;
    payerId: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export default IOrder;
