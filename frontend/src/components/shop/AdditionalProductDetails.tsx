import { useState } from "react";
import Reviews from "../common/Reviews";
import { FaProductHunt } from "react-icons/fa";
import { Product } from "@/interface/IApiProducts";
import Image from "next/image";

const AdditionalProductDetails = ({ product }: { product: Product }) => {
    const [activeTab, setActiveTab] = useState("Description");

    const productData = {
        description: {
            ProductSpecifications: `Care for fiber: 30% more recycled polyester. We label garments manufactured using environmentally friendly technologies and raw materials with the Join Life label.`,
            WashingInstructions: `The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.`,
            Material: [
                { icon: <FaProductHunt className="text-red-500" />, text: "Iron maximum 100ºC." },
                { icon: <FaProductHunt className="text-blue-500" />, text: "Do not bleach/bleach." },
                { icon: <FaProductHunt className="text-green-500" />, text: "Do not dry clean." },
            ],
        },
        additionalInfo: {
            Vendor: 'ShopSta',
            Type: "Fashion",
            Size: product.sizes.join(", "),
            Color: product.colors.join(", "),
            Sku: "445",
            Weight: "0.2",
        },
        video: "https://www.youtube.com/embed/example",
        review: <Reviews />,
    };

    const tabs = ["Description", "Additional Info", "Video", "Review"];

    return (
        <div className="w-full max-w-7xl mx-auto mt-20 p-2 md:p-4">
            <div className="flex flex-wrap justify-center gap-1 md:gap-4 border-b pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`active:opacity-60 transition-all duration-200 px-3 py-1 md:px-4 md:py-2 text-sm md:text-lg font-medium rounded-lg transition-all 
                            ${activeTab === tab ? "bg-black text-white" : "bg-gray-200 text-black"}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="mt-4 p-0 md:py-20 text-gray-700">
                {activeTab === "Description" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
                        <div className="relative w-full max-w-xs mx-auto md:mx-0 aspect-square bg-red-50 rounded-full overflow-hidden">
                            <Image
                                alt="product"
                                className="rounded-full"
                                fill
                                objectFit="cover"
                                src={product.images[0]}
                            />
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">Product Specifications</h3>
                            <p>{productData.description.ProductSpecifications}</p>

                            <h3 className="text-lg font-semibold mt-4">Washing Instructions</h3>
                            <p>{productData.description.WashingInstructions}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">Material</h3>
                            <div className="mt-2 space-y-2">
                                {productData.description.Material.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-2 justify-center md:justify-start">
                                        {item.icon}
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "Additional Info" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  max-w-3xl">
                        <p><strong>Vendor:</strong> {productData.additionalInfo.Vendor}</p>
                        <p><strong>Type:</strong> {productData.additionalInfo.Type}</p>
                        <p><strong>Size:</strong> {productData.additionalInfo.Size}</p>
                        <p><strong>Color:</strong> {productData.additionalInfo.Color}</p>
                        <p><strong>SKU:</strong> {productData.additionalInfo.Sku}</p>
                        <p><strong>Weight:</strong> {productData.additionalInfo.Weight} kg</p>
                    </div>
                )}

                {activeTab === "Video" && (
                    <div className="flex justify-center">
                        <iframe
                            className="w-full max-w-md h-56 rounded-lg"
                            src={productData.video}
                            title="Product Video"
                            allowFullScreen
                        />
                    </div>
                )}

                {activeTab === "Review" && <div>{productData.review}</div>}
            </div>
        </div>
    );
};

export default AdditionalProductDetails;
