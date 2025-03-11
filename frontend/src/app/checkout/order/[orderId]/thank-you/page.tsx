"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatPrice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { FiCheckCircle, FiHome, FiDownload, FiTruck, FiCreditCard } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { autoTable } from 'jspdf-autotable';
import { useEffect, useState } from "react";
import { getConfirmationOfOrder } from "@/features/shop/order/orderAction";
import IOrder from "@/interface/IOrder";
import OrderConfirmeSkeleton from "@/components/shimmer/OrderConfirmeSkeleton";
import Image from "next/image";

const generatePDF = async (order: IOrder) => {
    if (!order) return;
    const doc = new jsPDF();

    doc.addImage("/shopStaLogo.png", "PNG", 10, 10, 50, 20);
    doc.setFontSize(20);
    doc.text("Order Confirmation", 105, 30, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 10, 50);
    doc.text(`Estimated Delivery: ${order.orderStatus}`, 10, 60);

    const orderItems = order.cartItems.map((item) => [
        item.title,
        item.quantity,
        formatPrice(item.price),
        formatPrice(item.price * item.quantity),
    ]);

    autoTable(doc, {
        startY: 70,
        head: [["Product", "Quantity", "Price", "Total"]],
        body: orderItems,
    });

    const finalY = 80 + orderItems.length * 8

    doc.text("Shipping & Payment Details:", 10, finalY + 10);
    doc.text(`Shipping Address: ${order.addressInfo.address}, ${order.addressInfo.city}`, 10, finalY + 20);
    doc.text(`Payment Method: ${order.paymentMethod}`, 10, finalY + 30);
    doc.text(`Card Number: ${order.paymentDetails?.cardNumber}`, 10, finalY + 40);
    doc.text(`Expiration Date: ${order.paymentDetails?.expiryDate}`, 10, finalY + 50);
    doc.text(`Total: ${formatPrice(order.totalAmount)} DH`, 10, finalY + 70);

    doc.save(`order_confirmation_${order._id}.pdf`);
};
export default function OrderConfirmationPage() {
    const [order, setOrder] = useState<IOrder | null>(null);
    const { user } = useAppSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        const { orderId } = params;
        if (dispatch && orderId && typeof orderId === "string") {
            dispatch(getConfirmationOfOrder({ orderId })).then((state) => {
                setTimeout(() => {
                    setOrder(state.payload.order);
                    setLoading(false);
                }, 2000);
            });
        }
    }, [dispatch, params]);



    if (loading || !order || !user) {
        return <OrderConfirmeSkeleton />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <Card>
                <CardHeader className="text-center">
                    <FiCheckCircle className="text-6xl text-green-500 mx-auto" />
                    <CardTitle className="text-3xl font-bold mt-4">
                        Thank you for your order!
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <p className="text-gray-600 text-center">Your order has been successfully placed and is being processed.</p>

                    <div className="mt-8 text-left">
                        <h2 className="text-xl font-bold flex items-center">
                            <FiTruck className="mr-2" /> Order Summary
                        </h2>
                        <div className="mt-4 space-y-4">
                            {order.cartItems.map((item) => (
                                <div key={item._id} className="border-b py-4 flex space-x-4">
                                    <Image width={80} height={80} src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                                    <div>
                                        <h2 className="font-semibold">{item.title}</h2>
                                        <p className="text-gray-500">{formatPrice(item.price)} DH</p>
                                        <p className="text-gray-500">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 text-left">
                        <h2 className="text-xl font-bold flex items-center">
                            <FiCreditCard className="mr-2" /> Shipping & Payment Details
                        </h2>
                        <div className="mt-4 space-y-2">
                            <p>
                                <span className="font-semibold">Shipping Address:</span> {order.addressInfo.address}, {order.addressInfo.city}
                            </p>
                            <p>
                                <span className="font-semibold">Payment Method:</span> {order.paymentMethod}
                            </p>
                            {order.paymentDetails && <p>
                                <span className="font-semibold">Card Number:</span> {order.paymentDetails?.cardNumber}
                            </p>}
                            {order.paymentDetails && <p>
                                <span className="font-semibold">Expiration Date:</span> {order.paymentDetails?.expiryDate}
                            </p>}
                        </div>
                    </div>

                    <div className="mt-8 text-left">
                        <h2 className="text-xl font-bold">Total</h2>
                        <div className="mt-4 space-y-2">
                            <p>
                                <span className="font-semibold">Total Amount:</span> {formatPrice(order.totalAmount)} DH
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <Button className="active:opacity-60 transition-all duration-200 w-full bg-black text-white h-14 rounded-full flex items-center justify-center" onClick={() => router.push("/")}>
                            <FiHome className="mr-2" /> Back to Home
                        </Button>
                        <Button className="active:opacity-60 transition-all duration-200 w-full bg-blue-600 text-white h-14 rounded-full flex items-center justify-center" onClick={() => generatePDF(order)}>
                            <FiDownload className="mr-2" /> Download Invoice
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
