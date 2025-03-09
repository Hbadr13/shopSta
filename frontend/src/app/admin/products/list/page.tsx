"use client"

import ProductListComp from '@/components/admin/products/ProductListComp';
import { getAllProducts } from '@/features/admin/productActions';
import { useAppDispatch } from '@/redux/redux-hooks';
import { RootState } from '@/redux/store';
import { Input } from '@heroui/react';
import Link from 'next/link';
import { useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FiPlus } from 'react-icons/fi';
import { MdOutlineTipsAndUpdates } from 'react-icons/md';
import { useSelector } from 'react-redux';

const Page = () => {
    const { productList } = useSelector((state: RootState) => state.adminProduct);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);
    return (
        <div className='bg-white rounded-xl p-10'>
            <div className="text-xl font-semibold">
                All Product List
            </div>
            <div className="">
                <div className="text-gray-600 text-sm py-6 flex items-center space-x-2">
                    <MdOutlineTipsAndUpdates className='text-eco-blue-v0 w-5 h-5' />
                    <span>
                        search by <span className='font-semibold'>Product ID</span>: Each product is provided with a unique ID, which you can rely on to find the exact product you need.
                    </span>
                </div>
            </div>
            <div className='flex justify-between items-center py-4 '>

                <Input
                    className='  border-[1px] rounded-xl overflow-hidden  w-[400px]'
                    type="text" placeholder="Search here..."
                    endContent={<BiSearch className="w-5 h-5" />}
                />

                <Link href={'/admin/add-product'}
                    className="w-52 h-12 rounded-xl space-x-2 flex justify-center items-center border border-eco-blue-v0 font-semibold text-eco-blue-v0 hover:text-white hover:bg-eco-blue-v0 duration-200">
                    <FiPlus className="w-5 h-5" />
                    <div className="text-lg">
                        Product
                    </div>
                </Link>
            </div>
            <div className="w-full">
                {productList && <ProductListComp productList={productList} />}
            </div>
        </div>
    )
}

export default Page