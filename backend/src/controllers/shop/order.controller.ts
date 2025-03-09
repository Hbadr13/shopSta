import Order from "@model/order";
import { Request, Response } from "express";
import mongoose from "mongoose";


export const CreateOrder = async (request: Request, response: Response): Promise<void> => {
    const { cartItems, addressInfo, paymentMethod, totalAmount, paymentDetails, totalItems } = request.body;

    if (!request.user) {
        response.status(401).json({ success: false, message: "Unauthenticated user" });
        return;
    }
    const userId = typeof request.user === "string" ? request.user : request.user._id;

    if (!cartItems || cartItems.length === 0) {
        response.status(400).json({ success: false, message: "Cart is empty" });
    }

    const newOrder = new Order({
        userId: userId,
        cartItems,
        addressInfo,
        paymentMethod,
        paymentDetails,
        paymentStatus: 'pending',
        orderStatus: 'pending',
        totalAmount,
        totalItems
    });

    const order = await newOrder.save();
    response.status(201).json({ success: true, message: "Order confirmed", order: { orderId: order._id } });
    try {
    } catch (error) {
        response.status(500).json({ success: false, message: "Server error" });
    }
};

export const GetConfirmationByUser = async (request: Request, response: Response): Promise<void> => {
    try {
        if (!request.user) {
            response.status(401).json({ success: false, message: "Unauthenticated user" });
            return;
        }
        const { orderId } = request.params
        if (!orderId) {
            response.status(404).json({
                success: false,
                message: "Unable to load the Order",
            })
            return
        }

        let order
        try {
            order = await Order.findById(orderId)
        } catch (error) {

        }
        if (!order) {
            response.status(404).json({ success: false, message: "Order not found" });
            return
        }

        if (order.paymentMethod == 'credit_card' && order.paymentDetails.expiryDate && order.paymentDetails.cardNumber) {

            order.paymentDetails.cardNumber = '**** **** **** ' + order.paymentDetails.cardNumber.slice(order.paymentDetails.cardNumber.length - 4, order.paymentDetails.cardNumber.length)
            order.paymentDetails.expiryDate = '**/*' + order.paymentDetails.expiryDate[4]
        }
        const orderWithoutSensitiveData = {
            ...order.toObject(),
            paymentDetails: {
                ...order.paymentDetails,
                cvv: undefined,
            }
        };
        response.status(200).json({ success: true, order: orderWithoutSensitiveData });
    } catch (error) {
        response.status(500).json({ success: false, message: "Server error" });
    }
};

export const GetOrdersByUser = async (request: Request, response: Response): Promise<void> => {
    try {
        if (!request.user) {
            response.status(401).json({ success: false, message: "Unauthenticated user" });
            return;
        }
        const userId = typeof request.user === "string" ? request.user : request.user._id;
        const orders = await Order.find({ userId: userId }).sort({ createdAt: -1 });
        response.status(200).json({ success: true, orders });
    } catch (error) {
        response.status(500).json({ success: false, message: "Server error" });
    }
};

export const BayTheOrder = async (request: Request, response: Response): Promise<void> => {
    try {
        const { orderId } = request.params;
        const { paymentStatus } = request.body;

        if (!orderId) {
            response.status(400).json({ success: false, message: "Order ID is required" });
            return
        }

        let order;
        try {
            order = await Order.findById(orderId);
        } catch (err) {
            response.status(400).json({ success: false, message: "Order not found" });
            return
        }

        if (!order) {
            response.status(404).json({ success: false, message: "Order not found" });
            return
        }

        if (order.paymentStatus === "paid") {
            response.status(400).json({ success: false, message: "Order has already been paid" });
            return
        }

        if (paymentStatus === "paid") {
            order.paymentStatus = "paid";
            order.orderStatus = "processing";
        }

        await order.save();

        response.status(200).json({
            success: true,
            message: "Order payment processed",
            order,
        });
    } catch (error) {
        console.error("Payment processing error:", error);
        response.status(500).json({ success: false, message: "Server error, unable to process payment" });
    }

};


export const UpdateOrderStatus = async (request: Request, response: Response): Promise<void> => {
    try {
        const { orderId } = request.params;
        const { status } = request.body;

        const order = await Order.findById(orderId);
        if (!order) {
            response.status(404).json({ success: false, message: "Order not found" });
            return
        }

        order.orderStatus = status;
        await order.save();

        response.status(200).json({ success: true, message: "Order status updated", order });
    } catch (error) {
        console.error("Update order error:", error);
        response.status(500).json({ success: false, message: "Server error" });
    }
};

