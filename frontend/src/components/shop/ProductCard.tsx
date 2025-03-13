import Image from "next/image";
import { useEffect, useState } from "react";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import { Product } from "@/interface/IApiProducts";
import Link from "next/link";

import * as React from "react"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { addProductTofavorites, deleteProductFromFavorites } from "@/features/shop/favorite/favorite.action";
import { useRouter } from "next/navigation";
import ProductDetailsComp from "./ProductDetailsComp";

export function DrawerDialogDemo({ product }: { product: Product }) {
    const [open, setOpen] = React.useState(false);
    const [windowWidth, setWindowWidth] = useState<number>(window ? window.innerWidth : 0)
    useEffect(() => {
        const updateWindowWidth = () => {
            setWindowWidth(window.innerWidth)
        };

        window.addEventListener("resize", updateWindowWidth);
        return () => window.removeEventListener("resize", updateWindowWidth);
    }, []);
    if (windowWidth == 0) {
        return null;
    }

    if (windowWidth > 960) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button className="active:opacity-60 transition-all duration-200 group/button hover:bg-store-footer-hover duration-300 bg-white p-2 lg:p-3 rounded-full shadow-md">
                        <ShoppingCart size={20} className="text-gray-700 duration-300 group-hover/button:text-white" />
                    </button>
                </DialogTrigger>
                <DialogContent className="overflow-y-scroll h-[95vh] p-2 w-[70vw] max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Product details</DialogTitle>
                    </DialogHeader>
                    <ProductDetailsComp product={product} type="dialog" />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <button className="active:opacity-60 transition-all group/button hover:bg-store-footer-hover duration-300 bg-white p-2 lg:p-3 rounded-full shadow-md">
                    <ShoppingCart size={20} className="text-gray-700 duration-300 group-hover/button:text-white" />
                </button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Product details</DrawerTitle>
                </DrawerHeader>
                <div className="h-[75vh] overflow-y-auto  scroll-hidden  p-2">
                    <ProductDetailsComp product={product} type="dialog" />
                </div>
            </DrawerContent>
        </Drawer>
    );
}


const ProductCard = ({ product, favoritesProductIds, page }: { product: Product, favoritesProductIds: string[], page: 'main' | 'filter' }) => {
    const [hover, setHover] = useState(false);
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.auth)
    const router = useRouter()
    const handelAddToFavorites = () => {
        if (!user) {
            router.push('/auth/login')
            return
        }
        dispatch(addProductTofavorites({ productId: product._id }))
    }
    const handelremoveFavorites = () => {
        dispatch(deleteProductFromFavorites({ productId: product._id }))
    }
    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="group relative  rounded-lg p-4"
        >
            <div className="relative ">

                <Link href={`/product/${product._id}`} className="block  active:opacity-70  w-full aspect-[4/5]">
                    <Image
                        src={hover ? product.images[0] : product.images[1]}
                        alt={product.title}
                        fill
                        className="object-contain rounded-lg transition-transform duration-300 ease-in-out"
                    />
                </Link>
                <div className="absolute   right-1 md:right-4 bottom-4 flex items-center justify-center space-x-1  md:space-x-3 opacity-0  transition-all transform translate-y-0 group-hover:opacity-100 group-hover:-translate-y-3 duration-300 ">
                    <button onClick={favoritesProductIds.indexOf(product._id) == -1 ? handelAddToFavorites : handelremoveFavorites} className="active:opacity-60 transition-all duration-200 group/button hover:bg-store-footer-hover duration-300 bg-white p-2 lg:p-3 rounded-full shadow-md">
                        <Heart size={20} className={`${favoritesProductIds.indexOf(product._id) != -1 ? 'text-red-500 fill-red-500 group-hover/button:fill-white group-hover/button:text-white' : 'text-gray-700 group-hover/button:text-white'}  duration-300 `} />
                    </button>
                    <button onClick={() => router.push(`/product/${product._id}`)} className="active:opacity-60 transition-all duration-200 group/button hover:bg-store-footer-hover duration-300 bg-white p-2 lg:p-3 rounded-full shadow-md">
                        <Eye size={20} className="text-gray-700 duration-300 group-hover/button:text-white" />
                    </button>
                    <DrawerDialogDemo product={product} />
                </div>
            </div>


            <Link href={`/product/${product._id}`} className=" active:text-blue-700 hover:text-store-gray-600 duration-200 active:text-storedark text-lg font-medium text-store-gray-800 mt-2 text-center w-full">
                {product.title}
            </Link>
            <div className="w-full flex flex-col justify-center space-y-2">
                <div className="mt-2 justify-center  gap-1.5 flex flex-wrap">
                    {product.sizes.map((size, index) => (
                        <button
                            key={index}
                            className={`active:opacity-60 transition-all duration-200 ${page == 'main' ? 'px-2 py-0.5 text-base' : 'px-1 text-sm'} flex justify-center items-center font-semibold text-black border rounded-md hover:bg-eco-black-v3 duration-300`}
                        >
                            {size}
                        </button>
                    ))}
                </div>


                <div className="text-center">
                    {product.salePrice ? (
                        <div className="flex items-center justify-center space-x-2">
                            <p className="text-store-footer-hover font-bold">{product.salePrice}DH</p>
                            <p className="text-gray-500 line-through">{product.price}DH</p>
                            <p className="text-green-600 text-sm font-semibold">
                                -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                            </p>
                        </div>
                    ) : (
                        <p className="text-primary font-bold text-store-footer-hover"> {product.price}DH</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
