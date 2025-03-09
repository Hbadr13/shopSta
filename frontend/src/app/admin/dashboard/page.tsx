"use client"
import { getAllProducts } from '@/features/admin/productActions';
import { useAppDispatch } from '@/redux/redux-hooks';
import { useEffect } from 'react';

const Page = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])
    return (
        <div>
            <div className="w-full max-w-[1200px] mx-auto">
                admin Dashboard
            </div>

        </div>
    )
}

export default Page