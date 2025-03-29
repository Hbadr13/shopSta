"use client"
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { LuUsers } from "react-icons/lu";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaShoppingBag, FaDollarSign, FaUsers } from "react-icons/fa";
import { getAllProducts } from '@/features/admin/productActions';
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { getAllProductsByAdmin } from '@/features/admin/ordersActions'
import { FaCreditCard, FaMoneyBillWave, FaPaypal } from 'react-icons/fa'

const LastOrders = () => {
    const dispatch = useAppDispatch()
    const { isLoading, ordersList } = useAppSelector((state) => state.adminOrders)
    useEffect(() => {
        dispatch(getAllProductsByAdmin())
    }, [dispatch])

    const getPaymentIcon = (method: string) => {
        switch (method) {
            case 'credit_card': return <FaCreditCard className="inline mr-1" />
            case 'cod': return <FaMoneyBillWave className="inline mr-1" />
            case 'paypal': return <FaPaypal className="inline mr-1" />
            case 'stripe': return <FaCreditCard className="inline mr-1" />
            default: return null
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800'
            case 'processing': return 'bg-blue-100 text-blue-800'
            case 'shipped': return 'bg-purple-100 text-purple-800'
            case 'delivered': return 'bg-green-100 text-green-800'
            case 'cancelled': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800'
            case 'paid': return 'bg-green-100 text-green-800'
            case 'failed': return 'bg-red-100 text-red-800'
            case 'refunded': return 'bg-blue-100 text-blue-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }
    if (isLoading) return <div className="text-center py-8">Loading orders...</div>
    if (!ordersList || ordersList.length === 0) return <div className="text-center py-8">No orders found</div>
    return (
        <div className="container mx-auto px-4 py-8 bg-white rounded-2xl">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-1">
                    <MdOutlinePayments className='w-7 h-7 text-blue-400' />
                    <h2 className="text-lg font-semibold">Orders</h2>
                </div>
                <span className="text-sm text-gray-500 cursor-pointer">View all</span>
            </div>
            <div className="flex items-center space-x-1">
                <BiTimeFive className='text-blue-500' />
                <p className="text-gray-500 text-sm">since last weekend</p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="  bg-slate-100/70">
                        <tr>
                            <th className="py-3 px-4 text-left">Products</th>
                            <th className="py-3 px-4 text-left">Order ID</th>
                            <th className="py-3 px-4 text-left">Total Price</th>
                            <th className="py-3 px-4 text-left">Items</th>
                            <th className="py-3 px-4 text-left">Payment</th>
                            <th className="py-3 px-4 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className=" ">
                        {ordersList.slice(0, 5).map((order, index) => (
                            <tr key={index} className={` ${index % 2 ? 'bg-slate-100/70 rounded-l-2xl' : ''} hover:bg-gray-50`}>
                                <td className="py-4 px-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img
                                                className="h-10 w-10 rounded-md object-cover"
                                                src={order.cartItems[0]?.image || '/placeholder-product.jpg'}
                                                alt={order.cartItems[0]?.title || 'Product'}
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium">{order.cartItems[0]?.title || 'Product'}</p>
                                            {order.cartItems.length > 1 && (
                                                <p className="text-sm text-gray-500">+{order.cartItems.length - 1} more</p>
                                            )}
                                        </div>
                                    </div>
                                </td>

                                <td className="py-4 px-4">
                                    <p className="text-sm font-mono">{order._id.substring(0, 8)}...</p>
                                </td>
                                <td className="py-4 px-4">
                                    <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
                                </td>
                                <td className="py-4 px-4">
                                    <p>{order.totalItems}</p>
                                </td>
                                <td className="py-4 px-4">
                                    <div>
                                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </div>
                                </td>

                                <td className="py-4 px-4">
                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.orderStatus)}`}>
                                        {order.orderStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}













const statsData = [
    {
        title: "Total Sales",
        value: "945",
        percentage: "4.56%",
        isIncrease: true,
        icon: <FaShoppingBag className="text-green-500 text-2xl" />,
        chartData: [
            { day: "Mon", sales: 20, income: 15 },
            { day: "Tue", sales: 30, income: 20 },
            { day: "Wed", sales: 25, income: 18 },
            { day: "Thu", sales: 40, income: 30 },
            { day: "Fri", sales: 28, income: 22 },
            { day: "Sat", sales: 22, income: 18 },
            { day: "Sun", sales: 26, income: 20 },
        ],
    },
    {
        title: "Total Income",
        value: "37,802 DH",
        percentage: "1.56%",
        isIncrease: false,
        icon: <FaDollarSign className="text-orange-500 text-2xl" />,
        chartData: [
            { day: "Mon", sales: 30, income: 15 },
            { day: "Tue", sales: 20, income: 14 },
            { day: "Wed", sales: 15, income: 8 },
            { day: "Thu", sales: 40, income: 10 },
            { day: "Fri", sales: 28, income: 22 },
            { day: "Sat", sales: 22, income: 8 },
            { day: "Sun", sales: 41, income: 30 },
        ],
    },
    {
        title: "Total Visitors",
        value: "4945",
        percentage: "1.56%",
        isIncrease: true,
        icon: <FaUsers className="text-blue-500 text-2xl" />,
        chartData: [
            { day: "Mon", sales: 30, income: 15 },
            { day: "Tue", sales: 30, income: 20 },
            { day: "Wed", sales: 25, income: 28 },
            { day: "Thu", sales: 40, income: 5 },
            { day: "Fri", sales: 28, income: 22 },
            { day: "Sat", sales: 12, income: 18 },
            { day: "Sun", sales: 16, income: 6 },
        ],
    },
];

const StatsCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statsData.map((stat, index) => (
                <div key={index} className="bg-white shadow-lg rounded-xl p-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
                        <h3 className="text-lg font-semibold text-gray-600">{stat.title}</h3>
                    </div>

                    <div className="mt-2 flex justify-between items-center">
                        <h2 className="text-3xl font-bold">{stat.value}</h2>
                        <span className={`text-sm ${stat.isIncrease ? "text-green-500" : "text-red-500"}`}>
                            {stat.percentage} {stat.isIncrease ? "↑" : "↓"}
                        </span>
                    </div>

                    {/* Chart */}
                    <div className="mt-4 w-full h-28">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stat.chartData}>
                                <XAxis dataKey="day" />
                                <YAxis hide />
                                <Tooltip />
                                <Bar radius={2} dataKey="sales" fill="#fdba74" />
                                <Bar dataKey="income" fill="#60a5fa" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            ))}
        </div>
    );
}
import Image from 'next/image';
import { BiTimeFive } from 'react-icons/bi';
import { MdLocationCity, MdOutlinePayments, MdProductionQuantityLimits } from 'react-icons/md';

const moroccanCities = [
    { name: "Casablanca", sales: 10972, increase: true },
    { name: "Marrakech", sales: 9872, increase: true },
    { name: "Fes", sales: 9123, increase: false },
    { name: "Tangier", sales: 8560, increase: true },
    { name: "Rabat", sales: 7923, increase: false },
    { name: "Agadir", sales: 7654, increase: true },
    { name: "Oujda", sales: 7320, increase: false },
];

const TopCitiesBySales = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md w-full">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-1">
                    <MdLocationCity className='w-7 h-7 text-store-info' />
                    <h2 className="text-lg font-semibold">Top Cities By Sales</h2>
                </div>
                <span className="text-sm text-gray-500 cursor-pointer">View all</span>
            </div>
            <p className="text-2xl font-bold">37,802 DH<span className="text-green-500 text-sm">⬆ 1.56%</span></p>
            <div className="flex items-center space-x-1">
                <BiTimeFive className='text-blue-500' />
                <p className="text-gray-500 text-sm">since last weekend</p>
            </div>            <ul className="mt-4">
                {moroccanCities.map((city, index) => (
                    <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-700 w-1/2">{city.name}</span>
                        <div className="flex items-center w-1/2 justify-between">
                            {city.increase ? (
                                <FaArrowTrendUp className="text-green-500 mr-2" />
                            ) : (
                                <FaArrowTrendDown className="text-red-500 mr-2" />
                            )}
                            <span className="text-gray-700">{city.sales.toLocaleString()}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
const TopCustomersData = [
    {
        id: 1,
        username: "Ralph Williamson",
        totalmoney: 4000,
        Purchases: 22,
        image: "https://i.pravatar.cc/150?img=7"
    },
    {
        id: 2,
        username: "rodrygo Jane",
        totalmoney: 3400,
        Purchases: 18,
        image: "https://i.pravatar.cc/150?img=11"
    },
    {
        id: 3,
        username: "Cameron Williamson",
        totalmoney: 3000,
        Purchases: 16,
        image: "https://i.pravatar.cc/150?img=1"
    },
    {
        id: 4,
        username: "Ralph Edwards",
        totalmoney: 2400,
        Purchases: 11,
        image: "https://i.pravatar.cc/150?img=2"
    },
    {
        id: 5,
        username: "Eleanor Pena",
        totalmoney: 3100,
        Purchases: 9,
        image: "https://i.pravatar.cc/150?img=3"
    },
    {
        id: 6,
        username: "Jane Cooper",
        totalmoney: 1400,
        Purchases: 5,
        image: "https://i.pravatar.cc/150?img=4"
    }
]
const TopCustomers = () => {
    const { isLoading, productList } = useAppSelector((state) => state.adminProduct)
    if (!productList)
        return <div className=""></div>
    return (
        <div className="bg-white p-6 rounded-xl shadow-md  w-full">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-1">
                    <LuUsers className='w-7 h-7 text-green-500' />
                    <h2 className="text-lg font-semibold">Top Customers</h2>
                </div>
                <span className="text-sm text-gray-500 cursor-pointer">View all</span>
            </div>
            <div className="flex items-center space-x-1">
                <BiTimeFive className='text-blue-500' />
                <p className="text-gray-500 text-sm">since last weekend</p>
            </div>
            <ul className="mt-4">
                {TopCustomersData.map((user, index) => (
                    <li key={index} className="space-x-2 flex items-start py-2 border-b border-gray-100">
                        <Image className='  flex-none w-10 h-10 rounded-full ' alt={user.username} width={200} height={200} src={user.image} />
                        <div className="flex-initial w-3/4 truncate">
                            <div className="text-gray-900 ">{user.username}</div>
                            <div className="text-gray-400  text-xs ">Purchases {user.Purchases} items</div>
                        </div>
                        <div className=" text-end flex-initial text-sm w-1/4 truncate">
                            {user.totalmoney} DH
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
const TopSellingProduct = () => {
    const { isLoading, productList } = useAppSelector((state) => state.adminProduct)
    if (!productList)
        return <div className=""></div>
    return (
        <div className="bg-white p-6 rounded-xl shadow-md  w-full">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-1">
                    <MdProductionQuantityLimits className='w-7 h-7 text-pink-500' />
                    <h2 className="text-lg font-semibold">Top selling product</h2>
                </div>
                <span className="text-sm text-gray-500 cursor-pointer">View all</span>
            </div>
            <div className="flex items-center space-x-1">
                <BiTimeFive className='text-blue-500' />
                <p className="text-gray-500 text-sm">since last weekend</p>
            </div>
            {/* <div className="">Number of sales</div> */}
            <li className="text-sm text-black font-semibold space-x-2 flex items-start py-2 border-b border-gray-100">
                <div className='  flex-none w-8 h-10  ' />
                <div className="flex-initial w-1/4  truncate   ">
                    Product
                </div>
                <div className=" flex-initial  w-1/4 truncate  text-end">
                    Category
                </div>
                <div className="flex  items-center w-1/2">
                    <div className="w-1/3 truncate text-center">
                        N.of sales
                    </div>
                    <div className="w-1/3 truncate text-end">
                        Total sale

                    </div>
                    <div className="w-1/3 truncate text-end px-1.5 py-0.5">
                        Stock
                    </div>
                </div>
            </li>
            <ul className="mt-4">
                {productList.products.map((product, index) => (
                    <li key={index} className="space-x-2 flex items-start py-2 border-b border-gray-100">
                        <Image className='  flex-none w-8 h-10 rounded-md border' alt={product.title} width={200} height={200} src={product.images[0]} />
                        <div className="flex-initial w-1/4  truncate   ">
                            <div className="text-gray-900 truncate">{product.title}</div>
                            <div className="text-gray-400  text-xs ">{product.quantity} items</div>
                        </div>
                        <div className=" flex-initial text-sm w-1/4 truncate text-gray-600 text-end">
                            {product.category}
                        </div>
                        <div className="flex justify-around items-center w-1/2">

                            <div className="w-1/3 truncate text-center">
                                10
                            </div>
                            <div className="w-1/3 truncate text-end">
                                {product.price * 113} DH
                            </div>
                            <div className=" flex justify-center w-1/3 truncate">
                                {
                                    product.quantity ? <div className=' w-max text-xs bg-green-100 text-green-500 rounded-xl px-1.5 py-0.5'>In stock</div>
                                        :
                                        <div className='w-max text-xs bg-red-100 text-red-500 rounded-xl px-1.5 py-0.5'>Out stock</div>
                                }
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}


const Page = () => {
    const { user } = useAppSelector((state) => state.auth)
    const router = useRouter()
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])
    useEffect(() => {
        if (user)
            router.push('/admin/dashboard')
    }, [router, user])

    return <div className=" w-full grid gap-4">
        <StatsCards />

        <div className=" grid grid-cols-2  gap-4">
            <LastOrders />
            <TopSellingProduct />
        </div>
        <div className=" grid grid-cols-3  gap-4">
            <TopCustomers />
            <TopCitiesBySales />
        </div>

    </div>
}

export default Page