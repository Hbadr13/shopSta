import { Skeleton } from "@heroui/react";

const CartSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 flex-1 flex flex-col md:flex-row space-x-0 md:space-x-4">
            {/* Left Section - Cart Items */}
            <div className="w-full pc:w-3/5">
                <div className="flex flex-col items-center md:items-start border-b md:border-0 py-6 md:py-0">
                    <h1 className="text-2xl font-bold p-0 md:p-2">Bag</h1>
                </div>

                {/* Skeleton Items */}
                <div className="bg-white rounded-lg mt-4">
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="border-b py-4 animate-pulse">
                            <div className="flex space-x-4">
                                <div className="w-36 h-36 md:w-44 md:h-44 bg-gray-100 rounded-md"></div>
                                <div className="w-full space-y-2">
                                    <div className="flex w-full justify-between">
                                        <div className="h-5 w-3/4 bg-gray-100 rounded"></div>
                                        <Skeleton className="h-4 w-24 rounded-md" />

                                    </div>
                                    <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
                                    <div className="h-4 w-1/3 bg-gray-100 rounded"></div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 mt-7">
                                <div className="w-32 h-8 flex items-center border rounded-xl   px-4 py-2 bg-gray-100"></div>
                                <div className="w-8 h-8 bg-gray-100 rounded-md"></div>
                                <div className="w-8 h-8 bg-gray-100 rounded-md"></div>
                            </div>
                            <div className="flex flex-col space-y-4 mt-3 p-3">
                                <Skeleton className="h-4 w-40 rounded-md" />
                                <Skeleton className="h-3 w-24 rounded-md" />
                                <Skeleton className="h-3 w-16 rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full pc:w-2/5 bg-white rounded-lg p-4">
                <div className="text-2xl font-bold p-0 md:p-2">Summary</div>
                <div className="space-y-4 animate-pulse">
                    <div className="h-6 w-1/3 bg-gray-100 rounded"></div>
                    <div className="h-10 w-full bg-gray-100 rounded"></div>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <div className="h-4 w-1/4 bg-gray-100 rounded"></div>
                            <div className="h-4 w-1/4 bg-gray-100 rounded"></div>
                        </div>
                        <div className="flex justify-between">
                            <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
                            <div className="h-4 w-1/4 bg-gray-100 rounded"></div>
                        </div>
                        <div className="flex justify-between">
                            <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
                            <div className="h-4 w-1/4 bg-gray-100 rounded"></div>
                        </div>
                    </div>
                    <div className="p-2">
                        <Skeleton className="h-14 w-full bg-gray-100 rounded-full" />
                    </div>
                    <div className="h-4 w-2/3 bg-gray-100 rounded mx-auto"></div>
                </div>
            </div>
        </div>
    );
};

export default CartSkeleton;
