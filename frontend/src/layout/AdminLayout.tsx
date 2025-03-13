"use client"
import { checkAuth, logout } from "@/features/auth/authActions";
import { AppDispatch, RootState } from "@/redux/store";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { FiBell, FiGrid, FiSettings } from "react-icons/fi";
import SidebarComp from "@/layout/sidebar";
import { FiMessageSquare } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { motion } from "motion/react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LiaShippingFastSolid } from "react-icons/lia";
import { GoVerified } from "react-icons/go";
import { RiDiscountPercentFill } from "react-icons/ri";
import { GrCodeSandbox } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { Button, Input } from "@heroui/react";
import Image from "next/image";
import { LogOutIcon } from "lucide-react";

const messages = [
    {
        id: 1,
        sender: "Cameron Williamson",
        time: "10:13 PM",
        message: "Hello?",
        image: "https://i.pravatar.cc/150?img=1"
    },
    {
        id: 2,
        sender: "Ralph Edwards",
        time: "10:13 PM",
        message: "Are you there? Interested in this...",
        image: "https://i.pravatar.cc/150?img=2"
    },
    {
        id: 3,
        sender: "Eleanor Pena",
        time: "10:13 PM",
        message: "Interested in this loads?",
        image: "https://i.pravatar.cc/150?img=3"
    },
    {
        id: 4,
        sender: "Jane Cooper",
        time: "10:13 PM",
        message: "Okay...Do we have a deal?",
        image: "https://i.pravatar.cc/150?img=4"
    }
]
const notifications = [
    {
        id: 1,
        title: "Discount available",
        description: "Get a special discount on your next purchase. Don't miss out!",
        time: "10:15 PM",
        type: "promotion"
    },
    {
        id: 2,
        title: "Account has been verified",
        description: "Your account has been successfully verified. You can now access all features.",
        time: "9:45 PM",
        type: "account"
    },
    {
        id: 3,
        title: "Order shipped successfully",
        description: "Your order has been shipped and is on its way to you. Track your shipment for updates.",
        time: "9:30 PM",
        type: "shipping"
    },
    {
        id: 4,
        title: "Order pending: ID 305830",
        description: "Your order is pending. Please review and confirm your order details.",
        time: "9:10 PM",
        type: "order-status"
    }
];
type INotifs = typeof notifications[0];

interface INotification extends INotifs {
    icon: ReactNode,
    color: string
}

const PopupButton = ({ icon, color, label }: { icon: ReactNode, color: string, label: string }) => {
    const dispatch: AppDispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.auth)
    const _notifications: INotification[] = notifications.map((it) => {

        return {
            ...it,
            icon: it.type == 'shipping' ? <LiaShippingFastSolid className="w-10 h-10  text-eco-orange-v0" />
                : it.type == 'order-status' ? <GrCodeSandbox className="w-10 h-10 text-eco-green-v0" />
                    : it.type == 'account' ? <GoVerified className="w-10 h-10 text-eco-purple-v0" />
                        : <RiDiscountPercentFill width={40} height={40} className="w-10 h-10 text-eco-blue-v0" />,
            color: it.type == 'shipping' ? '#fff2ed'
                : it.type == 'order-status' ? '#e7fbef'
                    : it.type == 'account' ? '#f4e9ff'
                        : '#e9f2ff'

        }
    }
    )
    return <>
        <DropdownMenu  >
            <DropdownMenuTrigger asChild className='focus:outline-none focus:ring-0 rounded-full'>
                <button className="active:opacity-60 transition-all  hover:scale-105 relative active:opacity-75- duration-200 focus:outline-none focus:ring-0">
                    {label != 'userInfo' && <div className="relative z-10 w-10 h-10 bg-eco-blue-v3 rounded-full flex justify-center items-center">
                        {icon}
                    </div>}
                    {label != 'userInfo' ? <div style={{ backgroundColor: color }} className={`  w-5 h-5 rounded-full flex justify-center items-center text-white text-xs  absolute z-20 -top-1 -right-2`}>
                        4
                        <motion.div
                            style={{ backgroundColor: color }}
                            className={` w-9 h-9 rounded-full absolute -z-10`}
                            initial={{ scale: 0.5, opacity: 1 }} animate={{ scale: 1, opacity: 0.04, transition: { repeat: Infinity, duration: 0.4, repeatDelay: 0.3 } }}
                        />
                    </div> :
                        <div className="flex items-center space-x-2">
                            <Image alt="s2" width={200} height={200} className="w-10 h-10 object-cover rounded-full" src="/profile-admin.png" />
                            <div className=" text-sm">
                                <div className="font-semibold">{user?.firstName} {user?.lastName}</div>
                                <div className="text-eco-black-v2">admin</div>
                            </div>
                        </div>
                    }
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={` ${label == 'userInfo' ? 'w-[280px]' : 'w-[340px]'} mt-5 rounded-2xl`}>
                <DropdownMenuLabel className='text-lg p-4'>{label == 'userInfo' ? `Welcome ${user?.firstName}!` : label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className='space-y-2'>

                    {
                        label == 'Messages' ? messages.map((item, index) => (
                            <DropdownMenuItem className='' key={index}>
                                <Image alt="s1" width={200} height={200} className="w-12 h-12 object-cover rounded-full" src={item.image} />
                                <div className=" w-full">
                                    <div className="flex justify-between items-center">
                                        <div className="font-semibold">{item.sender}</div>
                                        <div className="text-xs text-eco-black-v2 truncate">{item.time}</div>
                                    </div>
                                    <div className="text-sm text-eco-black-v1 truncate">{item.message}</div>
                                </div>
                            </DropdownMenuItem>
                        ))
                            : label == 'Notifications' ? _notifications.map((item, index) => (
                                <DropdownMenuItem className='' key={index}>

                                    <div style={{ backgroundColor: item.color }} className="w-12  h-12 object-cover rounded-full flex justify-center items-center">
                                        <div className="scale-150">

                                            {item.icon}
                                        </div>
                                    </div>

                                    <div className=" w-[calc(100%-50px)]">
                                        <div className="font-semibold">{item.title}</div>
                                        <div className="text-xs text-eco-black-v2 line-clamp-2">{item.description}</div>
                                    </div>
                                </DropdownMenuItem>
                            )) :
                                <div className="flex items-center space-x-2">
                                    <Image alt="s4" width={200} height={200} className="w-10 h-10 object-cover rounded-full" src="/profile-admin.png" />
                                    <div className=" text-sm">
                                        <div className="font-semibold">{user?.firstName} {user?.lastName}</div>
                                        <div className="text-eco-black-v2">admin</div>
                                    </div>
                                </div>
                    }
                </DropdownMenuGroup>
                <div className="w-full p-2 mt-2">
                    {
                        label == 'userInfo' ?
                            <Button onPress={() => dispatch(logout())} className="active:opacity-60 transition-all duration-200 w-full rounded-2xl text-white font-bold bg-eco-orange-v0 text-center py-6" variant="faded">
                                <LogOutIcon />
                                Logout
                            </Button>
                            : <Button className="active:opacity-60 transition-all duration-200 w-full rounded-2xl text-white font-bold bg-eco-blue-v0 text-center py-6" variant="faded">View all</Button>
                    }
                </div>
            </DropdownMenuContent>
        </DropdownMenu>


    </>
}
const AdminLayout = ({ children }: { children: ReactNode }) => {
    const { isLoading } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);


    if (isLoading) return <div className="" />;

    return (
        <div className="">
            <div className="pl-[200px] w-full h-[80px] border border-b-[1px]">
                <div className="w-full h-full flex items-center justify-between px-5">
                    <Input size="lg" className=" border-1 rounded-2xl overflow-hidden w-full max-w-[600px] bg-white"
                        type="text" placeholder="Search here..."
                        endContent={<BiSearch className="w-5 h-5" />}
                    />
                    <div className="flex items-center space-x-10">
                        <PopupButton
                            label="Messages"
                            color={'#ff5100'}
                            icon={<FiMessageSquare className="w-5 h-5" />}
                        />
                        <PopupButton
                            label="Notifications"
                            color={'#2275fc'}
                            icon={<FiBell strokeWidth={2.2} className="w-5 h-5 bgec" />}
                        />
                        <div className="w-10 h-10 bg-eco-blue-v3 rounded-full flex justify-center items-center">
                            <FiUser strokeWidth={2.2} className="w-5 h-5" />
                        </div>
                        <div className="w-10 h-10 bg-eco-blue-v3 rounded-full flex justify-center items-center">
                            <FiGrid className="w-5 h-5" />
                        </div>
                        <PopupButton
                            label="userInfo"
                            color={'#2275fc'}
                            icon={<FiBell strokeWidth={2.2} className="w-5 h-5 bgec" />}
                        />

                        <div className="border-l-[1px] pl-4 h-[40px] flex items-center">
                            <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                <FiSettings className="w-5 h-5 text-eco-black-v2" />
                            </motion.button>
                        </div>

                    </div>
                </div>
            </div>
            <div className=" w-0 hidden md:block md:w-[210px] md:fixed top-0  h-screen bg-white border-r">
                <SidebarComp />
            </div>
            <div className="flex justify-end w-full   min-h-screen bg-eco-blue-v3 p-4 ">
                <div className=" w-full md:w-[calc(100%-210px)]">
                    {children}
                </div>
                {/* <div className=" w-full md:w-[calc(100%-210px)]">
                    {children}
                </div> */}
            </div>
            <div className="py-2 text-center w-full bg-white">
                Copyright © 2025 Shopsta. Design with by Themesflat All rights reserved.
            </div>
        </div>
    );
}

export default AdminLayout
