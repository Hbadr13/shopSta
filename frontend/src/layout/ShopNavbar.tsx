"use client";

import { Menu, PhoneCall, ShoppingBag, Heart, User, Home, LogOutIcon, ShoppingBagIcon, UserCheck } from "lucide-react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import CartPopup from "@/components/shop/CartPopup";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { setOpenCartPopup } from "@/features/shop/cartSlice";
import { usePathname, useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { logout } from "@/features/auth/authActions";
import { VscAccount } from "react-icons/vsc";
import ShopNavigationMenuDemo from "./ShopNavigationMenuDemo";
import { IoLocationOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { AlertDialogDemo } from "@/components/common/AlertDialogCard";
const UserCard = () => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.auth)
    const [windowWidth, setWindowWidth] = useState<number>(window ? window.innerWidth : 0)
    useEffect(() => {
        const updateWindowWidth = () => {
            setWindowWidth(window.innerWidth)
        };

        window.addEventListener("resize", updateWindowWidth);
        return () => window.removeEventListener("resize", updateWindowWidth);
    }, []);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger disabled={windowWidth < 768 ? true : false} asChild className='  focus:outline-none focus:ring-0 rounded-full'>
                <button className="  active:opacity-60 transition-all   md:hover:scale-105 relative  duration-200 focus:outline-none focus:ring-0">
                    <div className="flex items-center space-x-2">
                        <div className=" text-sm">
                            <div className="">{user?.firstName}</div>
                            <div className="hidden md:block">{user?.email}</div>
                        </div>
                        <UserCheck className=" w-5 h-5 md:w-7 md:h-7 mb-1 text-stone-700" />
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={` w-[270px] -translate-x-3  md:w-[340px] mt-5 rounded-2xl`}>
                <DropdownMenuLabel className='text-lg p-4'>Welcome {user?.firstName}!</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className='space-y-2'>
                    <div className="flex items-center space-x-2 pl-2">
                        <UserCheck className=" w-5 h-5 md:w-7 md:h-7 mb-1 text-stone-700" />
                        <div className=" text-sm">
                            <div className="font-semibold">{user?.firstName} {user?.lastName}</div>
                            <div className="text-eco-black-v2">{user?.email}</div>
                        </div>
                    </div>
                    <div className="px-2 py-4 space-y-2">
                        <Link href="/account" className="py-2 pl-2 bg-muted rounded-xl flex items-center text-gray-600 gap-3 text-lg font-medium hover:text-store-footer-hover transition">
                            <User className="w-5 h-5 " /> My account
                        </Link>
                        <Link href="/account/addresses" className="py-2 pl-2 bg-muted rounded-xl flex items-center text-gray-600 gap-3 text-lg font-medium hover:text-store-footer-hover transition">
                            <IoLocationOutline className="w-5 h-5 " /> My address
                        </Link>
                        <Link href="/orders" className="py-2 pl-2 bg-muted rounded-xl flex items-center text-gray-600 gap-3 text-lg font-medium hover:text-store-footer-hover transition">
                            <ShoppingBagIcon className="w-5 h-5 " /> My orders
                        </Link>
                    </div>

                </DropdownMenuGroup>
                <div className="w-full p-2 mt-2">
                    <AlertDialogDemo
                        title={'Are you sure you want to log out?'}
                        triggerButton={
                            <Button className="active:opacity-60 transition-all duration-200 w-full rounded-2xl text-white font-bold bg-eco-orange-v0 text-center py-6">
                                <LogOutIcon className="" />
                                Log out
                            </Button>
                        }
                        description={<span className="">Log out of ShopSta as {user?.email} </span>}
                        actionButton={<div>Log out</div>}
                        cancelButton={<div>Cancel</div>}
                        handelPressAction={() => dispatch(logout())}
                    />
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
    const { favoritesProductIds } = useAppSelector((state) => state.favoriteSlice)
    const pathname = usePathname()
    const menuItems = [
        { href: "/", icon: <Home className="w-5 h-5" />, label: "Home" },
        { href: "/products/all/best-seller", icon: <ShoppingBag className="w-5 h-5" />, label: "Shop" },
        { href: "/account", icon: <User className="w-5 h-5" />, label: "My account" },
        { href: "/account/addresses", icon: <IoLocationOutline className="w-5 h-5" />, label: "My address" },
        { href: "/account/wishlist", icon: <Heart className="w-5 h-5" />, label: "My wishlist" },
        { href: "/orders", icon: <ShoppingBagIcon className="w-5 h-5" />, label: "Orders" },
        { href: "/contact", icon: <PhoneCall className="w-5 h-5" />, label: "Contact" },
    ];
    const [open, setOpen] = useState(false);

    const handelClickFav = () => {
        if (!user) {
            router.push(`/auth/login?return_url=${encodeURIComponent('/account/wishlist')}`);
        } else {
            router.push("/account/wishlist");
        }
    }
    useEffect(() => {
        setOpen(false);
    }, [pathname]);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > prevScrollY && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setPrevScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollY]);
    return (
        <div className="">

            <CartPopup />
            <nav className={` bg-white fixed top-0 z-30 w-screen transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}  shado`}>
                <div className="flex items-center justify-between py-4  px-1.5 md:px-12 bg-white">
                    <div className=" flex items-center space-x-2">

                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild className="">
                                <button className="active:opacity-60 transition-all md:hidden hover:bg-store-gray-200/60 rounded-md duration-200 active:bg-eco-black-v2/30">
                                    <Menu width={55} height={55} className=" w-6 h-6 text-gray-700" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-6 space-y-6">
                                <SheetHeader>
                                    <SheetTitle className="sr-only">Menu</SheetTitle>
                                </SheetHeader>

                                <div className="space-y-4">
                                    {user ? <div className="flex items-center space-x-2 pl-2 py-4 border-b">
                                        <UserCheck className=" w-7 h-7 mb-1 text-stone-700" />
                                        <div className=" text-sm">
                                            <div className="font-semibold">{user?.firstName} {user?.lastName}</div>
                                            <div className="text-eco-black-v2">{user?.email}</div>
                                        </div>
                                    </div> :
                                        <Link href={'/auth/login'} className=" active:opacity-60 hover:underline-offset-2 hover:underline py-4 pl-2 border-b flex items-center space-x-2 hover:text-store-gray-700 duration-300">
                                            <VscAccount className="w-6 h-6" />
                                            <div className="text-base">Login</div>
                                        </Link>
                                    }
                                    {menuItems.map(({ href, icon, label }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            className=" bg-muted rounded-md p-2 flex items-center text-gray-600 gap-3 text-lg font-medium hover:text-store-footer-hover transition"
                                        >
                                            {icon} {label}
                                        </Link>
                                    ))}
                                    {user && <div className="w-full p-2 mt-2">

                                        <AlertDialogDemo
                                            title={'Are you sure you want to log out?'}
                                            triggerButton={
                                                <Button className="active:opacity-60 transition-all duration-200 w-full rounded-2xl text-white font-bold bg-store-hero text-center py-6">
                                                    <LogOutIcon className="" />
                                                    Log out
                                                </Button>
                                            }
                                            description={<span className="">Log out of ShopSta as {user?.email} </span>}
                                            actionButton={<div>Log out</div>}
                                            cancelButton={<div>Cancel</div>}
                                            handelPressAction={() => dispatch(logout())}
                                        />

                                    </div>}
                                </div>
                            </SheetContent>
                        </Sheet>
                        <Link className="text-2xl md:text-3xl font-extrabold" href="/">
                            <span className="text-primary cursor-pointer">Shop</span>
                            <span className="text-store-footer-hover cursor-pointer">Sta</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center h-10  w-full  max-w-sm  xl:max-w-md  shadow-sm">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent outline-none px-4 w-full h-full border"
                        />
                        <button className="active:opacity-60 transition-all duration-200 bg-store-footer-hover text-white hover:bg-red-400 h-full w-12 flex justify-center items-center">
                            <FaSearch className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="  -translate-x-8 md:-translate-x-0  flex items-center space-x-0.5 md:space-x-6">

                        <Link href="/account" className="hidden lg:flex items-center font-semibold text-gray-700 gap-3 text-lg  hover:text-gray-500 transition">
                            Account
                        </Link>
                        <div className="hidden lg:flex items-center space-x-2 text-gray-700">
                            <PhoneCall className="text-store-footer-hover w-5 h-5" />
                            <span className="font-semibold truncate">+212 693 768 664</span>
                        </div>
                        <button onClick={handelClickFav} className=" transition-all  scale-80 md:scale-100  hover:opacity-80 active:opacity-50 duration-200 relative cursor-pointer bg-white">
                            <Heart className=" text-primary" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {favoritesProductIds.length}
                            </span>
                        </button>

                        <button onClick={() => dispatch(setOpenCartPopup(true))} className="active:opacity-60 hover:opacity-80 transition-all duration-200 scale-80 md:scale-100  relative cursor-pointer ">
                            <ShoppingBag className="text-2xl text-primary" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {countity}
                            </span>
                        </button>
                        {

                            user ? <UserCard /> :
                                <Link href={'/auth/login'} className="flex items-center space-x-2 hover:text-store-gray-600 duration-300">
                                    <div className="text-sm md:text-base">Login</div> <VscAccount className=" w-5 h-5 md:w-6 md:h-6" />
                                </Link>

                        }


                    </div>
                </div>
                <div className="w-full flex justify-center border-t py-1">
                    <ShopNavigationMenuDemo />
                </div>
            </nav>
        </div>

    );
};

export default ShopNavbar;
