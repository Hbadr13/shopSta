'use client'
import { useAppSelector } from '@/redux/redux-hooks';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
    const { user, isLoading } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const pathname = usePathname()
    useEffect(() => {
        if (!user && !isLoading && pathname)
            router.push(`/auth/login?return_url=${encodeURIComponent(pathname)}`);
    }, [user, isLoading, pathname])
    return (
        <div>
            {children}
        </div>
    )
}

export default Layout