
"use client"
export const dynamicParams = true;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatPrice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { FiEdit, FiHome, FiPhone, FiCreditCard, FiTruck } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import IOrder from "@/interface/IOrder";
import OrderConfirmeSkeleton from "@/components/shimmer/OrderConfirmeSkeleton";
import { getConfirmationOfOrder } from "@/features/shop/order/orderAction";
import Link from "next/link";
import Image from "next/image";
import { addToast } from "@heroui/react";

export default function OrderReviewPage() {
    const [order, setOrder] = useState<IOrder | null>(null);
    const { user } = useAppSelector((state) => state.auth)
    const [loading, setLoading] = useState(true);
    const [paymentInProgress, setpaymentInProgress] = useState(false)
    const dispatch = useAppDispatch();
    const { orderId } = useParams<{ orderId: string }>();
    const router = useRouter();
    useEffect(() => {
        if (dispatch && orderId && typeof orderId === "string") {
            dispatch(getConfirmationOfOrder({ orderId })).then((state) => {
                setTimeout(() => {
                    if (state.payload.success) {
                        if (state.payload.order.paymentStatus == 'paid') {
                            addToast({
                                title: 'Order has already been paid',
                                description: `Order Id: ${orderId}`,
                                timeout: 3000,
                                color: "success",
                                shouldShowTimeoutProgress: true

                            })
                            setTimeout(() => {
                                router.push(`/order/${orderId}/view`)
                            }, 1500);
                        }
                        else {
                            setOrder(state.payload.order);
                            setLoading(false);
                        }
                    }
                    else addToast({
                        title: state.payload.message,
                        description: `Order Id: ${orderId}`,
                        color: "danger",
                        timeout: 3000,
                        shouldShowTimeoutProgress: true
                    })

                }, 2000);
            });
        }
    }, [dispatch, orderId]);

    const handleProceedToPayment = () => {
        setpaymentInProgress(true)
        setTimeout(() => {
            setpaymentInProgress(false)
            router.push(`/checkout/order/${order?._id}/payment`);
        }, 1000);
    };

    if (loading || !order || !user) {
        return <OrderConfirmeSkeleton />
    }

    return (
        <div className=" relative max-w-7xl mx-auto px-4 py-8">
            <Card className=" relative z-0 shadow-lg border border-gray-200 rounded-lg">
                <CardHeader className="text-center bg-blue-50 p-6 rounded-t-lg">
                    <FiEdit className="text-6xl text-blue-500 mx-auto" />
                    <CardTitle className="text-3xl font-bold mt-4">
                        Order Review
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-8 p-6">
                    <p className="text-gray-600 text-center mb-6">
                        Please review your order details before proceeding to payment.
                    </p>

                    <div className="text-left">
                        <h2 className="text-xl font-semibold flex items-center text-gray-700">
                            <FiEdit className="mr-2 text-gray-500" /> Order Summary
                        </h2>
                        <div className="mt-4 space-y-4">
                            {order.cartItems.map((item) => (
                                <div key={item._id} className="border-b py-4 flex space-x-4">
                                    <Image width={80} height={80} src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                                    <div className="space-y-2">
                                        <h2 className="font-semibold text-gray-800">{item.title}</h2>
                                        <p className="text-gray-500">{formatPrice(item.price)} DH</p>
                                        <p className="text-gray-500">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-left">
                        <h2 className="text-xl font-semibold flex items-center text-gray-700">
                            <FiHome className="mr-2 text-gray-500" /> Ship To
                            <Link href={`/checkout/order/${order._id}/edit`} className="ml-2 text-blue-500 hover:underline">
                                <FiEdit />
                            </Link>
                        </h2>
                        <div className="mt-4 space-y-2 bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600">
                                <span className="font-semibold">Name:</span> {order.addressInfo.address}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Address:</span> {order.addressInfo.address}, {order.addressInfo.city}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Phone:</span> {order.addressInfo.phone}
                            </p>
                        </div>
                    </div>

                    <div className="text-left">
                        <h2 className="text-xl font-semibold flex items-center text-gray-700">
                            <FiPhone className="mr-2 text-gray-500" /> Contact Info
                            <Link href={`/checkout/order/${order._id}/edit`} className="ml-2 text-blue-500 hover:underline">
                                <FiEdit />
                            </Link>
                        </h2>
                        <div className="mt-4 space-y-2 bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600">
                                <span className="font-semibold">Email:</span> {user?.email}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Full name:</span> {user?.firstName} {user.lastName}
                            </p>
                        </div>
                    </div>

                    <div className="text-left">
                        <h2 className="text-xl font-semibold flex items-center text-gray-700">
                            <FiCreditCard className="mr-2 text-gray-500" /> Payment Method
                            <Link href={`/checkout/order/${order._id}/edit`} className="ml-2 text-blue-500 hover:underline">
                                <FiEdit />
                            </Link>
                        </h2>
                        <div className="mt-4 space-y-2">
                            <p className="text-gray-600">
                                <span className="font-semibold">Method:</span> {order.paymentMethod}
                            </p>

                            {order.paymentMethod === "credit_card" && order.paymentDetails && (
                                <div className="mt-4 space-y-2 bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-600">
                                        <span className="font-semibold">Card Number:</span> {order.paymentDetails.cardNumber}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">Expiry Date:</span> {order.paymentDetails.expiryDate}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-left">
                        <h2 className="text-xl font-semibold text-gray-700">Total</h2>
                        <div className="mt-4 space-y-2">
                            <p className="text-gray-600">
                                <span className="font-semibold">Total Amount:</span> {formatPrice(order.totalAmount)} DH
                            </p>

                            {/* Free Shipping Section */}
                            <div className="mt-4 flex items-center bg-green-100 text-green-700 p-3 rounded-lg shadow-sm">
                                <FiTruck className="text-xl mr-2" />
                                <span className="font-medium">Free Shipping</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <Button
                            disabled={paymentInProgress}
                            className="active:opacity-60 transition-all duration-200 w-full bg-gray-600 text-white h-14 rounded-full flex items-center justify-center"
                            onClick={() => router.push(`/checkout/order/${order._id}/edit`)}
                        >
                            <FiEdit className="mr-2" /> Edit Order
                        </Button>
                        <Button
                            disabled={paymentInProgress}
                            className="active:opacity-60 transition-all duration-200 w-full bg-blue-600 text-white h-14 rounded-full flex items-center justify-center"
                            onClick={handleProceedToPayment}
                        >
                            <FiCreditCard className="mr-2" /> Pay now
                        </Button>
                    </div>
                </CardContent>
            </Card>
            {paymentInProgress && <div className="px-4 py-8  fixed z-10 inset-0 flex justify-center items-center">
                <div className="absolute z-20 inset-0 bg-white opacity-20"></div>
                <div className=" animate-spin absolute z-30 w-20 h-20 rounded-full border-5 border-store-primary border-x-transparent"></div>
            </div>}
        </div>
    );
}