"use client"

import AddProductComp from "@/components/admin/products/AddProductComp"
import { addNewProduct } from "@/features/admin/productActions"
import { useAppDispatch } from "@/redux/redux-hooks"
import { AppDispatch } from "@/redux/store"
import { useState } from "react"
import { addProductFormElements } from "@/config"
import Image from "next/image"
import { addToast } from "@heroui/react"
const initialFormData = {
    title: "",
    description: "",
    shortDescription: '',
    audience: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    quantity: "",
    sizes: [],
    images: ['none'],
    colors: [],
};
export interface IInitialFormDataProps {
    images: string[],
    title: string,
    description: string,
    shortDescription: string,
    audience: string,
    category: string,
    brand: string,
    price: string,
    salePrice: string,
    quantity: string,
    sizes: string[],
    colors: string[],
    [key: string]: string | string[]
}

const Page = () => {
    const [formData, setFormData] = useState<IInitialFormDataProps>(initialFormData);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [isLoading, setIsloading] = useState(false)
    const dispatch: AppDispatch = useAppDispatch()
    const hendelAddProcut = async () => {
        if (!selectedImages.length || addProductFormElements.filter((element) => element.items.filter((item) => item.isRequired && !formData[item.name]?.length).length).length) {
            addToast({
                title: 'Please fill in the required fields.',
                timeout: 2000,
                color: 'danger',
                shouldShowTimeoutProgress: true
            })
            return
        }
        setIsloading(true)
        const uploadedImages = await Promise.all(
            selectedImages.map(async (file) => {
                const imgformData = new FormData();
                imgformData.append("file", file);
                imgformData.append("upload_preset", "ml_default");
                imgformData.append("folder", "shopsta");
                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/dlxa1dkom/image/upload",
                    {
                        method: "POST",
                        body: imgformData,
                    }
                )
                const data = await response.json();
                return data.secure_url;
            })
        )
        const newFormData: IInitialFormDataProps = {
            ...formData,
            images: uploadedImages
        }
        dispatch(addNewProduct(newFormData)).then((data) => {
            if (data.payload?.success) {
                setIsloading(false)
                setSelectedImages([])
                addToast({
                    title: 'Product add successfully',
                    description: formData.title,
                    timeout: 2000,
                    color: 'success',
                    shouldShowTimeoutProgress: true

                })
                setFormData(initialFormData)
            }
            else {
                setIsloading(false)
                addToast({
                    title: 'Product not added',
                    description: formData.title,
                    timeout: 2000,
                    shouldShowTimeoutProgress: true,
                    color: 'danger'
                });

            }
        })
    }
    return (
        <div className="relative">
            {isLoading && <div className=" fixed inset-0 z-20  bg-eco-black-v2/10 flex  justify-center items-center">
                <Image alt="bouncing" width={200} height={200} src={'/bouncing-circles.svg'} />
            </div>}

            <AddProductComp
                hendelAddProcut={hendelAddProcut}
                formData={formData}
                setFormData={setFormData}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
            />
        </div>
    )
}

export default Page
