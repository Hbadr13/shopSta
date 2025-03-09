import { Skeleton } from "@heroui/react";
import { FiClock, FiPackage, FiTruck } from "react-icons/fi";

const OrdersSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-2 md:px-4 py-8">
            <h1 className="text-3xl font-bold">Order History</h1>

            <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <Skeleton className="w-full h-10 rounded-xl" />
                <Skeleton className="h-10 w-32 rounded"
                />

            </div>
            <div className="mt-8 space-y-4 divide-y">
                {[1, 2, 3].map((_, order) => (
                    <div key={order} className="bg-white md:rounded-lg md:shadow-md p-6">
                        <div className="flex justify-between items-center">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-52 rounded" />
                                <Skeleton className="h-3 w-32 rounded" />
                                <Skeleton className="h-3 w-20 rounded" />
                                <Skeleton className="h-3 w-20 rounded" />
                            </div>
                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-4">
                                <Skeleton className="h-8 w-32 rounded" />
                                <Skeleton className="h-8 w-32 rounded" />
                            </div>
                        </div>
                        <div className="text-center rounded-t-lg">
                            <div className="mt-4">
                                <div className="relative pt-4">
                                    <div className="h-1.5 md:h-2 bg-gray-200 rounded-full">
                                        <Skeleton className="h-1.5 md:h-2 bg-gray-300 rounded-full w-1/2" />
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        {[FiClock, FiTruck, FiPackage].map((Icon, index) => (
                                            <div key={index} className="text-center">
                                                <Icon className="text-medium md:text-2xl mx-auto text-gray-400" />
                                                <Skeleton className="mt-1 md:mt-2 h-4 w-20 mx-auto" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="mt-4">
                            <div className="relative pt-4">
                                <div className="h-1.5 md:h-2 bg-gray-200 rounded-full">
                                    <div
                                        className="h-1.5 md:h-2 bg-black rounded-full"
                                        style={{ width: `${getProgress(order.orderStatus)}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <div className={`${(order.orderStatus == 'processing' || order.orderStatus == 'shipped' || order.orderStatus == 'delivered') ? '' : 'text-store-gray-600'} text-center`}>
                                        <FiClock className="text-medium md:text-2xl mx-auto" />
                                        <p className="mt-1 md:mt-2 text-xs md:text-base">Processing</p>
                                    </div>
                                    <div className={`${(order.orderStatus == 'shipped' || order.orderStatus == 'delivered') ? '' : 'text-store-gray-600'} text-center`}>
                                        <FiTruck className="text-medium md:text-2xl mx-auto" />
                                        <p className="mt-1 md:mt-2 text-xs md:text-base">Shipped</p>
                                    </div>
                                    <div className={`${(order.orderStatus == 'delivered') ? '' : 'text-store-gray-600'} text-center`}>
                                        <FiPackage className="text-medium md:text-2xl mx-auto" />
                                        <p className="mt-1 md:mt-2 text-xs md:text-base">Delivered</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                ))}
            </div>

        </div>
    );
}
export default OrdersSkeleton