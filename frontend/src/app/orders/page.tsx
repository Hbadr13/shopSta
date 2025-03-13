"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { FiFileText, FiEye, FiSearch, FiTruck, FiPackage, FiClock, FiCheckCircle, FiAlertCircle, FiCreditCard, FiShoppingBag } from "react-icons/fi";
import { useEffect, useState } from "react";
import "jspdf-autotable";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { getAllOrders } from "@/features/shop/order/orderAction";
import IOrder from "@/interface/IOrder";
import moment from "moment";
import { useRouter } from "next/navigation";
import OrdersSkeleton from "@/components/shimmer/OrdersSkeleton";
import { MdOutlinePendingActions } from "react-icons/md";
import { getOrderStatusText, getPaymentStatusText } from "@/lib/statusText";
import { autoTable } from 'jspdf-autotable';
import "jspdf-autotable"; // Import the autoTable plugin
import { jsPDF } from "jspdf";
import Image from "next/image";
import { addToast } from "@heroui/react";
import Link from "next/link";
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
const OrderHistoryPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<null | IOrder>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const { user, isLoading } = useAppSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter()

    const filteredOrders = orders.filter((order) => {
        const matchesSearch = order._id.includes(searchQuery);
        const matchesStatus = filterStatus ? order.orderStatus === filterStatus : true;
        return matchesSearch && matchesStatus;
    });
    useEffect(() => {

        if (dispatch) {
            setLoading(true);
            dispatch(getAllOrders()).then((state) => {
                if (state.payload.success) {
                    setOrders(state.payload.orders);
                    setLoading(false);
                }
                else {
                    addToast({
                        title: state.payload.message,
                        color: "danger",
                        timeout: 3000,
                        shouldShowTimeoutProgress: true

                    });
                }
            });
        }
    }, [dispatch]);
    useEffect(() => {
        if (!user && !isLoading)
            router.push(`/auth/login?return_url=${encodeURIComponent('/orders')}`);
    }, [user, isLoading])
    if (loading)
        return <OrdersSkeleton />
    return (
        <div className="max-w-7xl mx-auto px-2 md:px-4 py-8">
            <h1 className="text-3xl font-bold">Order History</h1>
            {
                filteredOrders.length == 0 ? <div className="flex flex-col items-center justify-center py-14 md:py-24 text-center text-lg text-gray-600">
                    <div className="bg-gray-100 p-6 rounded-full mb-4">
                        <FiShoppingBag className="w-16 h-16 text-gray-400" />
                    </div>
                    <p className="mb-2">Your order history is empty.</p>
                    <p className="mb-4">Start shopping and place your first order!</p>
                    <Link
                        href="/products/all/best-seller"
                        className="text-store-dark hover:text-store-dark/80 font-semibold border border-store-dark px-4 py-2 rounded-md transition-all"
                    >
                        Browse Products
                    </Link>
                </div>

                    : <div className="">

                        <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Search by Order ID or Date"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                            <select
                                className="px-4 py-2 border border-gray-300 rounded-lg"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option className="bg-gray-200" value="">All Statuses</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="pending">Pending</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div className="mt-8 space-y-4 divide-y">
                            {filteredOrders.map((order) => (
                                <div key={order._id} className="bg-white md:rounded-lg md:shadow-md  p-2 md:p-6">
                                    <div className="flex flex-col xl:flex-row space-y-3  xl:space-y-0  xl:justify-between xl:items-center">
                                        <div>
                                            <p className="font-semibold">Order ID: {order._id}</p>
                                            <p className="text-gray-500">Date: {moment(order.createdAt).format('LL')}</p>
                                            <p className="text-gray-500">Status: {order.orderStatus}</p>
                                            <p className="text-gray-500">Total: {formatPrice(order.totalAmount)} DH</p>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center justify-betweenrounded-lg space-x-3">
                                                    <div className="flex items-center justify-between">

                                                        {order.paymentStatus == 'paid' ? (
                                                            <FiCheckCircle className="text-green-500 text-2xl  mr-2 w-5 h-5" />
                                                        ) : (
                                                            <FiAlertCircle className="text-red-500 text-2xl mr-2 w-5 h-5" />
                                                        )}
                                                        <p className="text-gray-700 font-semibold">
                                                            {getPaymentStatusText(order.paymentStatus)}
                                                        </p>
                                                    </div>

                                                </div>


                                                <div className="flex items-centerrounded-lg">
                                                    {
                                                        order.orderStatus == 'pending' || order.orderStatus == 'processing' ? (
                                                            <MdOutlinePendingActions className="text-gray-700 text-2xl mr-2 w-5 h-5" />
                                                        ) :
                                                            order.orderStatus == 'cancelled' ? (
                                                                <FiAlertCircle className="text-red-500 text-2xl mr-2 w-5 h-5" />
                                                            ) :
                                                                (
                                                                    <FiTruck className="text-green-500 text-2xl mr-2 w-5 h-5" />
                                                                )}
                                                    <p className="text-gray-700 font-semibold capitalize">
                                                        {getOrderStatusText(order.orderStatus)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-4">
                                            <Button
                                                className="active:opacity-60 transition-all duration-200 w-auto h-auto"

                                                variant="outline"
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setIsModalOpen(true);
                                                }}
                                            >
                                                <FiEye className="mr-2" />
                                                <div className="block">
                                                    View Order
                                                </div>
                                            </Button>
                                            {
                                                order.paymentStatus == 'pending' ? <Button
                                                    className="active:opacity-60 transition-all duration-200 bg-blue-600 text-white w-autoh-auto"
                                                    onClick={() => router.push(`/checkout/order/${order?._id}/review`)}
                                                >
                                                    <FiCreditCard className="mr-2" /> Pay now
                                                </Button>
                                                    : <Button
                                                        className="active:opacity-60 transition-all duration-200 w-auto h-auto"
                                                        variant="outline"
                                                        onClick={() => generatePDF(order)}
                                                    >
                                                        <FiFileText className="mr-2 " />
                                                        <div className="block">
                                                            Download Invoice
                                                        </div>
                                                    </Button>
                                            }
                                        </div>
                                    </div>

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
                                </div>
                            ))}
                        </div>
                    </div>}

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                    </DialogHeader>
                    {selectedOrder && (
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-xl font-bold">Order Summary</h2>
                                <div className="mt-4 space-y-4">
                                    {selectedOrder.cartItems.map((item) => (
                                        <div key={item._id} className="border-b py-4 flex space-x-4">
                                            <Image width={100} height={100} src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                                            <div>
                                                <h2 className="font-semibold">{item.title}</h2>
                                                <p className="text-gray-500">{formatPrice(item.price)} DH</p>
                                                <p className="text-gray-500">Quantity: {item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold">Shipping & Payment Details</h2>
                                <div className="mt-4 space-y-2">
                                    <p><span className="font-semibold">Shipping Address:</span> {selectedOrder.addressInfo.address}</p>
                                    <p><span className="font-semibold">Payment Method:</span> {selectedOrder.paymentMethod}</p>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold">Total</h2>
                                <div className="mt-4 space-y-2">
                                    <p><span className="font-semibold">Subtotal:</span> {formatPrice(selectedOrder.totalAmount)} DH</p>
                                    <p><span className="font-semibold">Total:</span> {formatPrice(selectedOrder.totalAmount)} DH</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        {selectedOrder && <Button className="active:opacity-60 transition-all duration-200" onClick={() => router.push(`/order/${selectedOrder._id}/view`)}>
                            More  details
                        </Button>}

                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
export default OrderHistoryPage