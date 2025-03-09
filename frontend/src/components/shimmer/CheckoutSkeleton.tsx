import { FiTruck, FiCreditCard, FiShoppingCart } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

const CheckoutSkeleton = () => {
    return (
        <div className="mt-5 max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row space-x-0 md:space-x-4 lg:space-x-10">
            <div className="w-full md:w-2/3 space-y-6">
                <div className="flex items-center space-x-2">
                    <IoBagCheckOutline className="w-6 h-6 -translate-y-0.5" />
                    <h1 className="text-2xl font-bold">Checkout</h1>
                </div>
                <div className="relative py-4 border-b">
                    <div className="flex justify-between">



                        {[{ icon: <FiTruck />, name: 'Delivery Options' }, { icon: <FiCreditCard />, name: 'Payment' }, { icon: <FiShoppingCart />, name: 'Order Review' }].map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <div className="text-gray-400">
                                    {item.icon}
                                </div>
                                <div className="">{item.name}</div>
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-0 left-0 h-1 bg-gray-200 w-full">
                        <div className="h-1 w-1/3 bg-gray-400 animate-pulse"></div>
                    </div>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className="h-14 w-full bg-gray-100 animate-pulse rounded-md"></div>
                    ))}
                    <div className="h-14 w-full bg-gray-100 animate-pulse rounded-full"></div>
                </div>
            </div>
            <div className="w-full md:w-1/3 bg-white rounded-lg  space-y-4">
                <h2 className="text-2xl font-bold flex items-center">
                    <MdOutlineShoppingCartCheckout className="mr-2" /> In Your Bag
                </h2>
                <div className="flex items-center space-x-2">
                    <FiShoppingCart className="text-gray-400" />
                    <div className="h-6 w-32 bg-gray-100 animate-pulse rounded-md"></div>
                </div>
                {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="flex justify-between">
                        <div className="h-6 w-40 bg-gray-100 animate-pulse rounded-md"></div>
                        <div className="h-6 w-16 bg-gray-100 animate-pulse rounded-md"></div>
                    </div>
                ))}

                <div className="text-lg font-bold flex justify-between border-t pt-2">
                    <div className="h-6 w-24 bg-gray-100 animate-pulse rounded-md"></div>
                    <div className="h-6 w-16 bg-gray-100 animate-pulse rounded-md"></div>
                </div>

                <div className="w-full h-14 bg-gray-100 animate-pulse rounded-full"></div>
            </div>
        </div>
    );
};

export default CheckoutSkeleton;
