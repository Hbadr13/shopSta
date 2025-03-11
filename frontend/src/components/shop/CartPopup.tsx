

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { Card } from "../ui/card";
import { removeFromCart, setOpenCartPopup, updateQuantity } from "@/features/shop/cartSlice";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";

const CartPopup = () => {
    const { cart, openCartPopup } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const router = useRouter()
    const pathname = usePathname()
    useEffect(() => {
        if (!dispatch)
            return
        if (cart.length) {
            dispatch(setOpenCartPopup(true));
        }
    }, [cart.length, dispatch]);
    useEffect(() => {
        if (pathname === "/cart") {
            dispatch(setOpenCartPopup(false));
        }
    }, [pathname, dispatch]);
    return (
        <Sheet open={openCartPopup} onOpenChange={(isOpen) => dispatch(setOpenCartPopup(isOpen))}>
            {openCartPopup && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => dispatch(setOpenCartPopup(false))}
                />
            )}

            <SheetContent
                side="top"
                className="  bg-white rounded-3xl top-10 sm:top-20 w-[96%] translate-x-[2%]   sm:w-[400px]  sm:translate-x-[calc(100vw-430px)] md:w-[450px]  md:translate-x-[calc(100vw-460px)]  shadow-lg  transition-all duration-300 ease-in-out  z-50"
            >
                <DialogTitle className="text-lg font-bold text-center">Added to Bag</DialogTitle>
                <div className="mt-4 space-y-4 h-96 overflow-auto scrollbar-hide pb-3">
                    {cart.length > 0 ? (
                        cart.map((item, index) => (
                            item && <Card key={index} className="p-4 flex space-x-4 items-start">
                                <div className="w-28 h-28 relative">
                                    <Image className="rounded-xl object-cover" src={item.product.images[0]} fill alt="prod" />
                                </div>

                                <div className="flex-1 p-2">
                                    <h3 className="font-semibold">{item.product.title}</h3>
                                    <h3 className="font-semibold text-store-footer-text/75 capitalize">{item.product.shortDescription}</h3>
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
                                        <div className="w-10 border-1 border-slate-500  h-5 rouxl opacity-65  rounded-xl" style={{ backgroundColor: item.color }} />
                                    </div>
                                    <p className="font-bold">${item.product.salePrice ? item.product.salePrice : item.product.price}</p>
                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center space-x-1 mt-2">
                                            <Button className="active:opacity-60 transition-all duration-200" variant="outline" size="sm" onClick={() => dispatch(updateQuantity({ id: item.id || 0, quantity: item.quantity - 1 }))} disabled={item.quantity <= 1}>-</Button>
                                            <span className="px-1">{item.quantity}</span>
                                            <Button className="active:opacity-60 transition-all duration-200" variant="outline" size="sm" onClick={() => dispatch(updateQuantity({ id: item.id || 0, quantity: item.quantity + 1 }))}>+</Button>
                                        </div>
                                        <Button variant="destructive" size="sm" className="active:opacity-60 transition-all duration-200 mt-2" onClick={() => dispatch(removeFromCart(item.id || 0))}>
                                            <FiTrash2 />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">Your cart is empty.</p>
                    )}

                </div>
                <div className="mt-6 flex flex-col space-y-2">
                    <Button onClick={() => { dispatch(setOpenCartPopup(false)); router.push('/cart') }} className="active:opacity-60 transition-all duration-200 w-full h-14 rounded-full text-lg font-medium">View Bag</Button>
                    <Button onClick={() => { dispatch(setOpenCartPopup(false)); router.push('/checkout') }} variant="outline" className="active:opacity-60 transition-all duration-200 w-full h-14 rounded-full text-lg font-medium">
                        Checkout
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CartPopup;
