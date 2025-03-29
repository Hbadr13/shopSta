"use client"
import { useAppSelector } from '@/redux/redux-hooks'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaShoppingBag, FaDollarSign, FaUsers } from "react-icons/fa";

const statsData = [
    {
        title: "Total Sales",
        value: "34,945",
        percentage: "1.56%",
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
        value: "$37,802",
        percentage: "1.56%",
        isIncrease: false,
        icon: <FaDollarSign className="text-orange-500 text-2xl" />,
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
        title: "Total Visitors",
        value: "34,945",
        percentage: "1.56%",
        isIncrease: true,
        icon: <FaUsers className="text-blue-500 text-2xl" />,
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
];

const StatsCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
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
                                <Bar dataKey="sales" fill="#facc15" />
                                <Bar dataKey="income" fill="#60a5fa" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            ))}
        </div>
    );
}

const Page = () => {
    const { user } = useAppSelector((state) => state.auth)
    const router = useRouter()
    useEffect(() => {
        if (user)
            router.push('/admin/dashboard')
    }, [router, user])

    if (!user)
        return <div className="h-screen w-screen bg-white">
            <StatsCards />
        </div>
}

export default Page