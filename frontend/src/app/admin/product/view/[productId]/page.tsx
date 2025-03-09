"use client"
import { getProductDetailsPyId } from '@/features/admin/productActions'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { AppDispatch } from '@/redux/store'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InnerImageZoom } from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Reviews from '@/components/common/Reviews'
import Image from 'next/image'
import { Product } from '@/interface/IApiProducts'



const ProductGallery = ({ product }: { product: { images: string[] } }) => {
    const inneref = useRef<HTMLDivElement | null>(null);
    const [divBHeight, setDivBHeight] = useState(0);
    const [currentSelectedImage, setCurrentSelectedImage] = useState<string | null>(product.images[0] || null);
    const [windowHeight, setWindowHeight] = useState(window?.innerWidth || 1);

    useEffect(() => {
        const updateHeight = () => {
            setWindowHeight(window?.innerWidth || 1);
            if (inneref.current) {
                setDivBHeight(inneref.current.clientHeight || 1);
            }
        };

        setTimeout(updateHeight, 100); // Allow some time for rendering
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, [currentSelectedImage]);

    const RenderLeftImages = () => (
        <div
            style={{ height: divBHeight }}
            className="w-full md:w-16  space-x-2 md:space-x-0 space-y-0 md:space-y-2 flex flex-row md:flex-col "
        >
            {product.images.map((url, index) => (
                <div key={index} className="relative w-12 h-14 truncate">
                    {url && (
                        <>
                            <Image
                                width={1000}
                                height={1000}
                                src={url}
                                alt="Uploaded Preview"
                                className="w-full h-full rounded-md object-cover"
                            />
                            <div
                                onMouseEnter={() => setCurrentSelectedImage(url)}
                                className={`absolute inset-0 ${url === currentSelectedImage ? "bg-black/20" : ""} rounded-md flex items-center justify-center cursor-pointer`}
                            />
                        </>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <div className="overflow-hidden flex  space-x-2 w-full">
                {windowHeight >= 768 && <RenderLeftImages />}
                {currentSelectedImage && (
                    <div ref={inneref} className="w-full h-full rounded-xl object-cover">
                        <InnerImageZoom className='rounded-md' src={currentSelectedImage} zoomSrc={currentSelectedImage} />
                    </div>
                )}
            </div>
            {windowHeight < 768 && <RenderLeftImages />}
        </div>
    );
};

interface ProductDetailsProps {
    product: Product
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    return (
        <Card className="w-full  bg-white rounded-xl overflow-hidden p-7">
            <CardContent className="">
                <div className="flex space-x-10  max-w-5xl mx-auto">

                    <div className="w-3/5">
                        <ProductGallery product={product} />
                    </div>

                    <div className="w-2/5">

                        <h2 className="text-2xl font-semibold">{product.title}</h2>
                        <span className=" mt-2 text-eco-black-v1/70 capitalize font-semibold">{product.shortDescription}</span>
                        <div className="mt-4 flex items-center">
                            {product.salePrice ? (
                                <>
                                    <span className="text-red-500 font-bold text-xl">${product.salePrice}</span>
                                    <span className="text-gray-400 line-through ml-2">${product.price}</span>
                                    <Badge className="ml-2 bg-red-500 text-white">Promo</Badge>
                                </>
                            ) : (
                                <span className="text-black font-bold text-xl">${product.price}</span>
                            )}
                        </div>
                        <div className="mt-10 space-y-2">
                            <div className="">Available sizes</div>
                            {product.sizes.map((size, index) => (
                                <Badge key={index} className="  text-xs mr-2 px-4 py-1.5 rounded-md">{size}</Badge>
                            ))}
                        </div>

                        <div className="mt-8 space-y-2">
                            <div className="">available colors</div>
                            <div className="flex gap-2">
                                {product.colors.map((color, index) => (
                                    <div
                                        key={index}
                                        className="w-8 h-6 rounded-md border"
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="mt-20">
                            <p className="text-gray-950 font-medium">{product.description.text}</p>
                            <div className="mt-4">
                                {product.description.details.map((detail, index) => (
                                    <div key={index} className="flex justify-start space-x-2">
                                        <span className="text-sm font-medium text-gray-500">{detail.label}</span>
                                        <span className="text-sm text-gray-700">{detail.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 text-sm text-gray-600 flex justify-between">
                            <p>⭐ {product.averageRating} / 5 ({product.totalRating} ratings)</p>
                            <p>📦 {product.totalSale} sales</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="w-full max-w-4xl mx-auto my-14 h-[0.5px] bg-eco-black-v2/25"></div>
                    <div className="max-w-3xl mx-auto">
                        <Reviews />
                    </div>
                </div>

            </CardContent>

            <CardFooter className="p-6 flex justify-between">
                <Button variant="outline">Edit Product</Button>
                <Button className="bg-red-500 text-white">Delete Product</Button>
            </CardFooter>
        </Card>
    );
};


export default function Page() {
    const dispatch: AppDispatch = useAppDispatch()
    const { productId } = useParams()
    const { isLoading, productDetails } = useAppSelector((state) => state.adminProduct)
    useEffect(() => {
        if (typeof productId == "string" && dispatch)
            dispatch(getProductDetailsPyId(productId))
    }, [dispatch, productId])

    if (isLoading || !productDetails)
        return <div className="w-full h-80 bg-blue-200 text-5xl">loading ....</div>


    return (
        <div className="w-full">
            <ProductDetails product={productDetails} />
        </div>
    );
}
