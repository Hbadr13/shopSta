import Order from "../../model/order";
import { Request, Response } from "express";

export const editOrderStatusByAdmin = async (request: Request, response: Response): Promise<void> => {
    try {
        const { orderId } = request.body;
        const { status } = request.body;

        const order = await Order.findById(orderId);
        if (!order) {
            response.status(404).json({ success: false, message: "Order not found" });
            return
        }

        order.orderStatus = status;
        await order.save();
        const orders = await Order.find().sort({ createdAt: -1 });

        response.status(200).json({ success: true, message: "Order status updated", orders: orders });
    } catch (error) {
        response.status(500).json({ success: false, message: "Server error" });
    }
};
export const getAllOrderByAdmin = async (request: Request, response: Response): Promise<void> => {
    try {

        const orders = await Order.find().sort({ createdAt: -1 });
        response.status(200).json({ success: true, orders });
    } catch (error) {
        response.status(500).json({ success: false, message: "Server error" });
    }
};