"use client"
import AdminLayout from '@/layout/AdminLayout'
import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <AdminLayout>

            {children}
        </AdminLayout>
    )
}

export default Layout