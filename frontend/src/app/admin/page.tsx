"use client"
import { useAppSelector } from '@/redux/redux-hooks'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Page = () => {
    const { user } = useAppSelector((state) => state.auth)
    const router = useRouter()
    useEffect(() => {
        if (user)
            router.push('/admin/dashboard')
    }, [router, user])

    if (!user)
        return <div className="h-screen w-screen bg-white"></div>
}

export default Page