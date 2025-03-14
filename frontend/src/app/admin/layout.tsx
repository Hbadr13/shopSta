"use client"
import AdminLayout from '@/layout/AdminLayout'
import { useAppSelector } from '@/redux/redux-hooks'
import { usePathname, useRouter } from 'next/navigation'
import React, { ReactNode, useEffect } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
    const { user, isLoading } = useAppSelector((state) => state.auth)
    const router = useRouter()
    const pathname = usePathname()
    useEffect(() => {
        if (isLoading)
            return
        if (!user) {
            router.push("/auth/login");
        }
        else if (user.role != "admin") {
            router.push("/auth/login");
        }
    }, [user, pathname, isLoading, router]);
    return (user && user.role == 'admin') ? (
        <AdminLayout>
            {children}
        </AdminLayout>)
        :
        <div className="h-screen w-screen bg-white"></div>


}

export default Layout