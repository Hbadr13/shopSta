import Link from "next/link";
import { FaTruck, FaUndo, FaHeadset, FaLock } from "react-icons/fa";

const features = [
    {
        icon: <FaTruck className="w-10 h-10 text-store-footer-hover group-hover:text-white duration-300" />,
        title: "Free Delivery",
        description: "Orders over $199",
    },
    {
        icon: <FaUndo className="w-10 h-10 text-store-footer-hover group-hover:text-white duration-300" />,
        title: "Free Returns",
        description: "On all unused items",
    },
    {
        icon: <FaHeadset className="w-10 h-10 text-store-footer-hover group-hover:text-white duration-300" />,
        title: "Online Support",
        description: "Always online 24/7",
    },
    {
        icon: <FaLock className="w-10 h-10 text-store-footer-hover group-hover:text-white duration-300" />,
        title: "Secure Payment",
        description: "100% Secure payment",
    },
];

const Features = () => {
    return (
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2   p-6 rounded-lg duration-300">
            {features.map((feature, index) => (
                <Link href="#" key={index} className="flex items-center space-x-4 p-4 group  ">
                    <div className="w-20 aspect-square rounded-full flex justify-center items-center border bg-white group-hover:bg-store-footer-hover duration-300">
                        {feature.icon}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">{feature.title}</h3>
                        <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Features;
