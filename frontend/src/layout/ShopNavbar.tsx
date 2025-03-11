"use client";

import { Menu, PhoneCall, ShoppingBag, Heart, User, Home } from "lucide-react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import CartPopup from "@/components/shop/CartPopup";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { setOpenCartPopup } from "@/features/shop/cartSlice";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { logout } from "@/features/auth/authActions";
import { VscAccount } from "react-icons/vsc";
import ShopNavigationMenuDemo from "./ShopNavigationMenuDemo";
import Image from "next/image";
import { getCookie } from "cookies-next/client";
const UserCard = () => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.auth)
    return (
        <DropdownMenu  >
            <DropdownMenuTrigger asChild className='focus:outline-none focus:ring-0 rounded-full'>
                <button className=" hover:scale-105 relative active:opacity-75- duration-200 focus:outline-none focus:ring-0">
                    <div className="flex items-center space-x-2">
                        <div className=" text-sm">
                            <div className="">{user?.userName}</div>
                            <div className="">{user?.email}</div>
                        </div>
                        <Image width={100} height={100} alt='d' className="w-10 h-10 object-cover rounded-full" src="/profile-admin.png" />
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={` w-[340px] mt-5 rounded-2xl`}>
                <DropdownMenuLabel className='text-lg p-4'>Welcome hbadr!</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className='space-y-2'>
                    <div className="flex items-center space-x-2">
                        <Image width={100} height={100} alt='a' className="w-10 h-10 object-cover rounded-full" src="/profile-admin.png" />
                        <div className=" text-sm">
                            <div className="font-semibold">hbadr</div>
                            <div className="text-eco-black-v2">admin</div>
                        </div>
                    </div>

                </DropdownMenuGroup>
                <div className="w-full p-2 mt-2">
                    <Button onClick={() => dispatch(logout())} className="w-full rounded-2xl text-white font-bold bg-eco-orange-v0 text-center py-6">Loug out</Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const ShopNavbar = () => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.auth)
    const cart = useAppSelector((state) => state.cart)
    const countity = cart.cart.reduce((acc, item) => acc + item.quantity, 0)
    const router = useRouter()
    const handelClickFav = () => {
        if (!user) {
            router.push(`/auth/login?return_url=${encodeURIComponent('/favorite')}`);
        } else {
            router.push("/favorite");
        }
    }
    return (
        <nav className=" shado">
            ={getCookie('token')}=
            <div className="flex items-center justify-between py-4 px-4 md:px-12 bg-white">
                <CartPopup />
                <Link className="text-2xl md:text-3xl font-extrabold" href="/">
                    <span className="text-primary cursor-pointer">Shop</span>
                    <span className="text-store-footer-hover cursor-pointer">Sta</span>
                </Link>

                <div className="hidden md:flex items-center h-10  w-full max-w-md  shadow-sm">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent outline-none px-4 w-full h-full border"
                    />
                    <button className="bg-store-footer-hover text-white hover:bg-red-400 h-full w-12 flex justify-center items-center">
                        <FaSearch className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex items-center space-x-4 md:space-x-6">
                    <div className="hidden lg:flex items-center space-x-2 text-gray-700">
                        <PhoneCall className="text-store-footer-hover w-5 h-5" />
                        <span className="font-semibold">+212 693 768 664</span>
                    </div>
                    <button onClick={handelClickFav} className="relative cursor-pointer bg-white">
                        <Heart className="text-2xl text-primary" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                            0
                        </span>
                    </button>

                    <button onClick={() => dispatch(setOpenCartPopup(true))} className="relative cursor-pointer ">
                        <ShoppingBag className="text-2xl text-primary" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                            {countity}
                        </span>
                    </button>
                    {

                        user ? <UserCard /> :
                            <Link href={'/auth/login'} className="flex items-center space-x-2 hover:text-store-gray-600 duration-300">
                                <div>Login</div> <VscAccount className="w-6 h-6" />
                            </Link>

                    }

                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="md:hidden hover:bg-store-gray-200/60 rounded-md p-1 duration-200 active:bg-eco-black-v2/30">
                                <Menu width={25} height={25} className=" text-gray-700" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-6 space-y-6">
                            <SheetHeader>
                                <SheetTitle className="sr-only">Menu</SheetTitle>
                            </SheetHeader>

                            <div className="space-y-4">
                                <Link href="/" className="flex items-center gap-3 text-lg font-medium hover:text-store-footer-hover transition">
                                    <Home className="w-5 h-5 text-gray-600" /> Home
                                </Link>
                                <Link href="/shop" className="flex items-center gap-3 text-lg font-medium hover:text-store-footer-hover transition">
                                    <ShoppingBag className="w-5 h-5 text-gray-600" /> Shop
                                </Link>
                                <Link href="/contact" className="flex items-center gap-3 text-lg font-medium hover:text-store-footer-hover transition">
                                    <PhoneCall className="w-5 h-5 text-gray-600" /> Contact
                                </Link>
                                <Link href="/account" className="flex items-center gap-3 text-lg font-medium hover:text-store-footer-hover transition">
                                    <User className="w-5 h-5 text-gray-600" /> Account
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <div className="w-full flex justify-center border-t py-1">
                <ShopNavigationMenuDemo />
            </div>
        </nav>
    );
};

export default ShopNavbar;
