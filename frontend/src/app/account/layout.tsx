'use client'
import { useAppSelector } from '@/redux/redux-hooks';
import Image from 'next/image';
import Link from 'next/link';
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
            <div className="relative w-max h-max ">
                <Image className=' relative z-0 w-screen  min-h-40  max-h-52 object-cover' alt='woancver' width={2000} height={2000} src={'/cover/womanCover.png'} />
                <div className=" bg-black/5 flex flex-col justify-center items-center inset-0 z-10 absolute top-0">
                    <div className="text-2xl font-medium text-white/90 flex items-center">
                        <Link className='active:opacity-60' href={'/'}>Home</Link>  - {pathname == '/account' ? 'Account' : 'Addresses'}
                    </div>
                    <div className="text-5xl font-black text-white/90">
                        {pathname == '/account' ? 'Account' : 'Addresses'}
                    </div>
                </div>
            </div>
            <div className="w-full border-b-blue-400">

                {children}
            </div>
        </div >
    )
}

export default Layout