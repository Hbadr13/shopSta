"use client"
import { getProductDetailsPyId } from '@/features/shop/productAction'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { AppDispatch } from '@/redux/store'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import AdditionalProductDetails from '@/components/shop/AdditionalProductDetails'
import ProductSkeleton from '@/components/shimmer/ProductSkeleton'
import ProductDetailsComp from '@/components/shop/ProductDetailsComp'
import { getfavorites } from '@/features/shop/favorite/favorite.action'




export default function Page() {
    const dispatch: AppDispatch = useAppDispatch()
    const { productId } = useParams()
    const { isLoading, productDetails } = useAppSelector((state) => state.adminProduct)
    useEffect(() => {
        if (typeof productId == "string")
            dispatch(getProductDetailsPyId(productId))
        dispatch(getfavorites())

    }, [dispatch])
    if (isLoading || !productDetails)
        return <ProductSkeleton />


    return (
        <div className="w-full p-1">
            <Card className="w-full  bg-white rounded-xl  p-2 md:p-7 mt-2 ">
                <CardContent className="p-0 md:p-2 lg:p-8">
                    <ProductDetailsComp product={productDetails} type='page' />
                    <AdditionalProductDetails product={productDetails} />
                </CardContent>
            </Card>
        </div>
    );
}
