
import { IInitialFormDataProps } from "@/app/admin/products/add/page";
import Image from "next/image";
import React, { useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

interface ProductDisplayWhenCreatedProps {
    formData: IInitialFormDataProps
    setFormData: (formData: IInitialFormDataProps) => void
    setSelectedImages: (selectedImages: File[]) => void
    selectedImages: File[]
}

const ProductDisplayWhenCreated: React.FC<ProductDisplayWhenCreatedProps> = ({ formData, selectedImages, setSelectedImages }) => {
    const [currentSelectedImage, setCurrentSelectedImage] = useState<File | null>(null)
    return (
        <div className="p-2">
            <div className="flex space-x-2">
                <div className="space-y-2   ">
                    {
                        selectedImages.concat(Array.from({ length: 8 - selectedImages.length })).map((it, index) =>
                            <div key={index} className="relative w-12 h-14">
                                {
                                    it != undefined &&
                                    <Image width={300} height={500}
                                        src={URL.createObjectURL(it)}
                                        alt="Uploaded Preview"
                                        className="w-full h-full rounded-md object-cover"
                                    />
                                }
                                <div onMouseEnter={() => it != undefined && setCurrentSelectedImage(it)} className={` ${it != undefined && 'cursor-pointer'} absolute inset-0 bg-eco-black-v2/15 rounded-md  flex items-center justify-center`} />
                            </div>
                        )
                    }
                </div>
                <div className="h-auto w-full max-w-[550px] rounded-xl relative">
                    {
                        selectedImages.length ?
                            <div className="">

                                <InnerImageZoom
                                    src={URL.createObjectURL(currentSelectedImage || selectedImages[selectedImages.length - 1])}
                                    zoomSrc={URL.createObjectURL(currentSelectedImage || selectedImages[selectedImages.length - 1])}
                                    className="w-full h-full rounded-md object-cover"
                                    hasSpacer={true}

                                />
                                <button onClick={() => { setSelectedImages(selectedImages.filter((img) => currentSelectedImage ? img != currentSelectedImage : img != selectedImages[selectedImages.length - 1])); setCurrentSelectedImage(null) }} className="absolute top-4 right-4 bg-white px-2">X</button>
                            </div>
                            :
                            <div className="w-full h-full rounded-md object-cover bg-eco-black-v2/15" />
                    }
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-2 mt-4">{formData.title}</h2>
            <h4 className="text- font-semibold mb-2">{formData.shortDescription}</h4>
            <p className="text-gray-600 mb-4">{formData.description}</p>

            <div className="space-y-2">
                <div>
                    <span className="font-semibold">Audience:</span> {formData.audience}
                </div>
                <div>
                    <span className="font-semibold">Category:</span> {formData.category}
                </div>
                <div>
                    <span className="font-semibold">Brand:</span> {formData.brand}
                </div>
            </div>

            <div className="flex items-center space-x-4 mt-4">
                <div className="text-lg font-semibold text-gray-800">
                    Price: {formData.salePrice ? (
                        <>
                            <span className="line-through text-red-500">${formData.price}</span>{" "}
                            <span>${formData.salePrice}</span>
                        </>
                    ) : (
                        <span>${formData.price}</span>
                    )}
                </div>
                <div>
                    <span className="text-gray-600">Stock: </span>
                    <span className="text-gray-800">{formData.quantity}</span>
                </div>
            </div>

            <div className="mt-4">
                <div className="mb-2 font-semibold">Sizes:</div>
                <div className="flex space-x-2">
                    {formData.sizes.map((size) => (
                        <span
                            key={size}
                            className="px-3 py-1 border border-gray-300 rounded-md text-gray-700"
                        >
                            {size}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-4">
                <div className="mb-2 font-semibold">Colors:</div>
                <div className="flex space-x-2">
                    {formData.colors.map((color) => (
                        <span
                            key={color}
                            style={{ backgroundColor: color.toLowerCase() }}
                            className="w-6 h-6 rounded-full border border-gray-300"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDisplayWhenCreated;
