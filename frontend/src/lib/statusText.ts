export const getOrderStatusText = (status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'): string => {
    switch (status) {
        case 'pending':
            return 'Order Pending';
        case 'processing':
            return 'Order is Being Processed';
        case 'shipped':
            return 'Order Shipped';
        case 'delivered':
            return 'Order Delivered';
        case 'cancelled':
            return 'Order Cancelled';
        default:
            return 'Unknown Order Status';
    }
};

export const getPaymentStatusText = (status: 'pending' | 'paid' | 'failed' | 'refunded'): string => {
    switch (status) {
        case 'pending':
            return 'Awaiting Payment';
        case 'paid':
            return 'Payment Completed';
        case 'failed':
            return 'Payment Failed';
        case 'refunded':
            return 'Payment Refunded';
        default:
            return 'Unknown Payment Status';
    }
};
