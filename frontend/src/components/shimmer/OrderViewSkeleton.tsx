import { Skeleton } from "@heroui/react";
import { FiClock, FiTruck, FiPackage } from "react-icons/fi";

const OrderViewSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">Your Order Information</h1>

            <div className="border border-gray-200 rounded-lg mt-5">
                <div className="text-center bg-blue-50 p-6 rounded-t-lg">
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
                <div className="space-y-8 p-6">
                    <div className="flex items-center bg-gray-100 p-4 rounded-lg">
                        <Skeleton className="w-6 h-6 rounded-full mr-3" />
                        <Skeleton className="h-5 w-40" />
                    </div>
                    <div className="flex items-center bg-gray-100 p-4 rounded-lg">
                        <Skeleton className="w-6 h-6 rounded-full mr-3" />
                        <Skeleton className="h-5 w-40" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Order Summary</h2>
                        <div className="mt-4 space-y-4">
                            {[1, 2, 3].map((_, index) => (
                                <div key={index} className="border-b py-4 flex space-x-4">
                                    <Skeleton className="w-20 h-20 rounded-md" />
                                    <div className="flex flex-col space-y-2">
                                        <Skeleton className="h-5 w-40" />
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Shipping Information</h2>
                        <div className="mt-4 bg-gray-50 p-4 rounded-lg space-y-2">
                            <Skeleton className="h-4 w-64" />
                            <Skeleton className="h-4 w-72" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Payment Method</h2>
                        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                            <Skeleton className="h-4 w-40" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Total</h2>
                        <div className="mt-4">
                            <Skeleton className="h-6 w-32" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderViewSkeleton;
