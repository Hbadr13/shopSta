import { Skeleton } from "@heroui/react"
import { FiCreditCard, FiTruck } from "react-icons/fi"

const OrderConfirmeSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg p-8 text-center">
                <div className="flex justify-center">
                    <Skeleton className="h-16 w-16 rounded-full" />
                </div>

                <h1 className="text-3xl font-bold mt-4">
                    <Skeleton className="h-8 w-48 mx-auto" />
                </h1>
                <div className="text-gray-600 mt-2">
                    <Skeleton className="h-4 w-64 mx-auto" />
                </div>

                <div className="mt-8 text-left">
                    <h2 className="text-xl font-bold flex items-center">
                        <FiTruck className="mr-2" /> Order Summary
                    </h2>
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

                <div className="mt-8 text-left">
                    <h2 className="text-xl font-bold flex items-center">
                        <FiCreditCard className="mr-2" /> Shipping & Payment Details
                    </h2>
                    <div className="mt-4 space-y-2">
                        <Skeleton className="h-4 w-72" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                </div>

                <div className="mt-8 text-left">
                    <h2 className="text-xl font-bold">Total</h2>
                    <div className="mt-4 space-y-2">
                        <Skeleton className="h-6 w-32" />
                    </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <Skeleton className="w-full h-14 rounded-full" />
                    <Skeleton className="w-full h-14 rounded-full" />
                </div>
            </div>
        </div>
    )
}
export default OrderConfirmeSkeleton