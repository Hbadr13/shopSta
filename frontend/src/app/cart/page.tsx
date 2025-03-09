"use client";

import CartSkeleton from "@/components/shimmer/CartSkeleton";
import DynamicDeliveryDate from "@/components/shop/DynamicDeliveryDate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { removeFromCart, updateQuantity } from "@/features/shop/cartSlice";
import { addProductTofavorites, deleteProductFromFavorites, getfavorites } from "@/features/shop/favorite/favorite.action";
import { formatPrice } from "@/lib/formatPrice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { Button as HeButton } from '@heroui/button'
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";

export default function CartPage() {
    const { user } = useAppSelector((state) => state.auth)
    const { loadingStatus, favoritesProductIds } = useAppSelector((state) => state.favoriteSlice)
    const devRef = useRef(null)
    const router = useRouter()
    const [waiting, setWaiting] = useState(false)
    const { cart } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch()
    const subtotal = cart.filter((item) => item).reduce((acc, item) => acc + (item.product.salePrice ? item.product.salePrice : item.product.price) * item.quantity, 0);
    const totalItems = cart.filter((item) => item).reduce((acc, item) => acc + item.quantity, 0);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(getfavorites())

        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 600);
    }, [])

    const handleCheckout = () => {
        if (!subtotal) return;
        setWaiting(true)
        setTimeout(() => {
            setWaiting(false)
            if (!user) {
                router.push(`/auth/login?return_url=${encodeURIComponent('/checkout')}`);
            } else {
                router.push("/checkout");
            }
        }, 1200);
    };

    const handelAddToFavorites = (productId: string) => {
        if (!user) {
            router.push(`/auth/login?return_url=${encodeURIComponent('/cart')}`);
            return
        }
        dispatch(addProductTofavorites({ productId: productId }))
    }

    const handelremoveFavorites = (productId: string) => {
        dispatch(deleteProductFromFavorites({ productId: productId }))
    }

    if (loading)
        return (
            <CartSkeleton />
        )
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 flex-1  flex flex-col pc:flex-row space-x-0 md:space-x-4">
            <div ref={devRef} className=" w-full pc:w-3/5 ">
                <div className="flex flex-col  items-center md:items-start border-b md:border-0 py-6 md:py-0 md:p-0">
                    <h1 className="text-2xl font-bold p-0 md:p-2">Bag</h1>
                    <div className="text-xl font-medium block md:hidden">
                        <span className="text-gray-500">{totalItems} Items |</span>  <span>{subtotal}DH</span>
                    </div>
                </div>
                <div className="bg-white rounded-lg mt-4">
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            item && <div key={item.id} className=" border-b py-4">
                                <div className="flex space-x-4">

                                    <Image width={144} height={144} src={item.product.images[0]} alt={item.product.title} className=" w-36 h-36 md:w-44 md:h-44 object-cover rounded-md" />
                                    <div className="w-full">
                                        <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between w-full">
                                            <h2 className="font-semibold">{item.product.title}</h2>
                                            <h2 className="font-semibold">{formatPrice(item.product.salePrice ? item.product.salePrice * item.quantity : item.product.price)}DH</h2>
                                        </div>
                                        <div className="space-x-2">
                                            <span>Brand:</span>
                                            <span>{item.brand}</span>
                                        </div>
                                        <div className="space-x-2">
                                            <span>Size:</span>
                                            <span>{item.size}</span>
                                        </div>
                                        <div className="space-x-2 flex items-center skew-x-1">
                                            <span>Color:</span>
                                            <div className="w-10 border-1 border-slate-500  h-5 rouxl bg-opacity-40  rounded-xl" style={{ backgroundColor: item.color }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 mt-7">
                                    <div className="  flex items-center border rounded-xl w-max ">
                                        <HeButton variant='light' size="sm" onPress={item.quantity > 1 ? () => dispatch(updateQuantity({ id: item.id || 0, quantity: item.quantity - 1 })) : undefined} className={` text-base font-semibold  h-10  ${item.quantity > 1 ? '' : ' cursor-not-allowed'}`}>-</HeButton>
                                        <span className="px-2 text-base font-semibold">{item.quantity}</span>
                                        <HeButton className="h-10 text-base font-semibold" variant='light' size="sm" onPress={() => dispatch(updateQuantity({ id: item.id || 0, quantity: item.quantity + 1 }))}>+</HeButton>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => dispatch(removeFromCart(item.id || 0))}>
                                        <FiTrash2 />
                                    </Button>
                                    <Button
                                        disabled={loadingStatus == 'Adding product' || loadingStatus == 'Removing product'}
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            favoritesProductIds.indexOf(item.product._id) === -1
                                                ? handelAddToFavorites(item.product._id)
                                                : handelremoveFavorites(item.product._id)
                                        }
                                    >
                                        <Heart size={20} className={`${favoritesProductIds.indexOf(item.product._id) != -1 ? 'text-red-500 fill-red-500 group-hover/button:fill-white group-hover/button:text-white' : 'text-gray-700 group-hover/button:text-white'}  duration-300 `} />

                                    </Button>

                                </div>
                                <div className="bg-white rounded-lg p-4 space-y-4">
                                    <h2 className="text-lg font-semibold">Shipping</h2>
                                    <div className="text-gray-500"><DynamicDeliveryDate /><span className="text-blue-500 underline cursor-pointer">Edit Location</span></div>
                                    <p className="text-gray-500">Free Pickup <span className="text-blue-500 underline cursor-pointer">Find a Store</span></p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-xl w-full flex flex-col items-center space-y-4  text-center py-4">
                            <div className="">
                                Your cart is empty.
                            </div>
                            <Button variant="outline" className="w-max" size="sm" onClick={() => router.push('/')}>
                                <FiArrowLeft /> Back to Home
                            </Button>
                        </div>)}
                </div>

            </div>
            <div style={{ height: `${cart.length * 320}px` }} className={`w-full pc:w-2/5 bg-white rounded-lg p-4`}>
                <div className=" sticky top-10 space-y-4">
                    <h2 className="text-2xl font-bold p-0 md:p-2">Summary</h2>
                    <div className="flex items-center space-x-2">
                        <Input placeholder="Promo Code" className="flex-1" />
                        <Button variant="outline">Apply</Button>
                    </div>
                    <div className="space-y-2 text-gray-600">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-semibold">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Estimated Shipping & Handling</span>
                            <span className="font-semibold">Free</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Estimated Tax</span>
                            <span className="font-semibold">—</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm">
                        Members get free shipping on orders $50.00+
                        <span className="text-blue-500 underline cursor-pointer"> Join us or Sign in</span>
                    </p>
                    <Button disabled={waiting} onClick={handleCheckout} className={`${subtotal ? 'bg-black text-white' : 'bg-store-gray-200 hover:bg-store-gray-200 cursor-not-allowed border-1 border-gray-400 text-black'} w-full h-14 rounded-full text-lg font-medium  `}>
                        {

                            waiting ? <div className="flex items-center space-x-2">
                                <div className="border-r-4 animate-spinner-ease-spin w-10 h-10  rounded-full border-white">

                                </div>
                                <div className="">
                                    Processing…
                                </div>
                            </div> : 'Proceed to checkout'
                        }
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                        By selecting one of the above payment options, you confirm that you have read, understand, and agree to ShopSta’s Terms of Use, Terms of Sale and Return Policy, and acknowledge ShopSta’s <span> <Link className="text-blue-800 active:bg-blue-400" href={'/privacy-policy'}>Privacy Policy</Link> </span> .
                    </p>
                </div>
            </div>
        </div>
    );
}
