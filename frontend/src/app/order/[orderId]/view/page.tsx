"use client";
export const dynamicParams = true;

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { FiCreditCard, FiTruck, FiCheckCircle, FiAlertCircle, FiClock, FiPackage } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import IOrder from "@/interface/IOrder";
import { getConfirmationOfOrder } from "@/features/shop/order/orderAction";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/formatPrice";
import Link from "next/link";
import Image from "next/image";
import { MdOutlinePendingActions } from "react-icons/md";
import OrderViewSkeleton from "@/components/shimmer/OrderViewSkeleton";
import { Button } from "@/components/ui/button";
import { getOrderStatusText, getPaymentStatusText } from "@/lib/statusText";
type OrderStatus = "pending" | "cancelled" | "processing" | "shipped" | "delivered";

const getProgress = (status: OrderStatus): number => {
    const progressMap: Record<OrderStatus, number> = {
        pending: 0,
        cancelled: 0,
        processing: 10,
        shipped: 50,
        delivered: 100,
    };
    return progressMap[status];
};
export default function OrderDetailsPage() {
    const [order, setOrder] = useState<IOrder | null>(null);
    const { user, isLoading } = useAppSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();
    const { orderId } = useParams<{ orderId: string }>();
    const { toast } = useToast();
    const router = useRouter();
    useEffect(() => {
        if (!user && !isLoading && orderId)
            router.push(`/auth/login?return_url=${encodeURIComponent(`/order/${orderId}/view`)}`);
    }, [user, isLoading, orderId])
    useEffect(() => {
        if (dispatch && orderId) {
            dispatch(getConfirmationOfOrder({ orderId })).then((state) => {
                if (state.payload.success) {
                    setOrder(state.payload.order);
                    setLoading(false);
                } else {
                    toast({
                        title: state.payload.message,
                        description: `Order Id: ${orderId}`,
                        variant: "destructive",
                        duration: 2000
                    });
                }
            });
        }
    }, [dispatch, orderId]);

    if (loading || !order || !user) {
        return <OrderViewSkeleton />;
    }
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">Your Order Information</h1>

            <Card className=" border border-gray-200 rounded-lg mt-5">
                <CardHeader className="text-center bg-blue-50 p-6 rounded-t-lg">
                    <div className="mt-4">
                        <div className="relative pt-4">
                            <div className="h-1.5 md:h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-1.5 md:h-2 bg-black rounded-full"
                                    style={{ width: `${getProgress(order.orderStatus)}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <div className={`${(order.orderStatus == 'processing' || order.orderStatus == 'shipped' || order.orderStatus == 'delivered') ? '' : 'text-store-gray-400'} text-center`}>
                                    <FiClock className="text-medium md:text-2xl mx-auto" />
                                    <p className="mt-1 md:mt-2 text-xs md:text-base">Processing</p>
                                </div>
                                <div className={`${(order.orderStatus == 'shipped' || order.orderStatus == 'delivered') ? '' : 'text-store-gray-400'} text-center`}>
                                    <FiTruck className="text-medium md:text-2xl mx-auto" />
                                    <p className="mt-1 md:mt-2 text-xs md:text-base">Shipped</p>
                                </div>
                                <div className={`${(order.orderStatus == 'delivered') ? '' : 'text-store-gray-400'} text-center`}>
                                    <FiPackage className="text-medium md:text-2xl mx-auto" />
                                    <p className="mt-1 md:mt-2 text-xs md:text-base">Delivered</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8 p-6">

                    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                        <div className="flex items-center justify-between">

                            {order.paymentStatus == 'paid' ? (
                                <FiCheckCircle className="text-green-500 text-2xl mr-3" />
                            ) : (
                                <FiAlertCircle className="text-red-500 text-2xl mr-3" />
                            )}
                            <p className="text-gray-700 font-semibold">
                                {getPaymentStatusText(order.paymentStatus)}
                            </p>
                        </div>
                        {order.paymentStatus == 'pending' && <Button
                            className=" bg-blue-600 text-white h-8 rounded flex items-center justify-center"
                            onClick={() => router.push(`/checkout/order/${order?._id}/review`)}
                        >
                            <FiCreditCard className="mr-2" /> Pay now
                        </Button>}
                    </div>


                    <div className="flex items-center bg-gray-100 p-4 rounded-lg">
                        {
                            order.orderStatus == 'pending' || order.orderStatus == 'processing' ? (
                                <MdOutlinePendingActions className="text-gray-700 text-2xl mr-3" />
                            ) :
                                order.orderStatus == 'cancelled' ? (
                                    <FiAlertCircle className="text-red-500 text-2xl mr-3" />
                                ) :
                                    (
                                        <FiTruck className="text-green-500 text-2xl mr-3" />
                                    )}
                        <p className="text-gray-700 font-semibold capitalize">
                            {getOrderStatusText(order.orderStatus)}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Order Summary</h2>
                        <div className="mt-4 space-y-4">
                            {order.cartItems.map((item) => (
                                <div key={item._id} className="border-b py-4 flex space-x-4">
                                    <Link href={`/product/${item.productId}`} className="active:opacity-70">
                                        <Image width={500} height={500} src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md " />
                                    </Link>
                                    <div>
                                        <Link href={`/product/${item.productId}`} className="font-semibold text-gray-800 active:text-blue-800">{item.title}</Link>
                                        <p className="text-gray-500">{formatPrice(item.price)} DH</p>
                                        <p className="text-gray-500">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Shipping Information</h2>
                        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600"><strong>Name:</strong> {order.addressInfo.address}</p>
                            <p className="text-gray-600"><strong>Address:</strong> {order.addressInfo.address}, {order.addressInfo.city}</p>
                            <p className="text-gray-600"><strong>Phone:</strong> {order.addressInfo.phone}</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Payment Method</h2>
                        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600"><strong>Method:</strong> {order.paymentMethod}</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Total</h2>
                        <div className="mt-4">
                            <p className="text-gray-600"><strong>Total Amount:</strong> {formatPrice(order.totalAmount)} DH</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
