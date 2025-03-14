"use client";

import { Button } from '@/components/ui/button';
import { deleteProductFromFavorites, getfavorites } from '@/features/shop/favorite/favorite.action';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';

const FavoriteProducts: React.FC = () => {
    const dispatch = useAppDispatch();
    const { favorites, loadingStatus } = useAppSelector((state) => state.favoriteSlice);

    useEffect(() => {
        dispatch(getfavorites())
    }, [dispatch]);

    const handelRemoveFromFav = (productId: string) => {
        dispatch(deleteProductFromFavorites({ productId }));
    };
    if (!favorites || loadingStatus === "Loading favorites")
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {
                            [...Array(4)].map((_, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div className="animate-pulse space-y-4 p-4">
                                        <div className="bg-gray-200 w-full h-48 rounded-md"></div>
                                        <div className="bg-gray-200 h-6 rounded-md"></div>
                                        <div className="bg-gray-200 h-6 rounded-md w-3/4"></div>
                                        <div className="flex justify-between items-center space-x-2">
                                            <div className="bg-gray-200 h-6 w-1/3 rounded-md"></div>
                                            <div className="bg-gray-200 h-6 w-1/3 rounded-md"></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Your Wishlist Products</h1>

                {favorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-14 md:py-24 text-center text-lg text-gray-600">
                        <div className="bg-gray-100 p-6 rounded-full mb-4">
                            <FiHeart className="w-16 h-16 text-gray-400" />
                        </div>
                        <p className="mb-2">Your wishlist is empty.</p>
                        <p className="mb-4">Explore products and add them to your wishlist!</p>
                        <Link
                            href="/products/all/best-seller"
                            className="text-store-dark hover:text-store-dark/80 font-semibold border border-store-dark px-4 py-2 rounded-md transition-all"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {
                            favorites.map((product) => (
                                <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    <Image
                                        width={500} height={500}
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4 space-y-4">
                                        <Link href={`/product/${product._id}`} className="text-xl font-semibold text-gray-900 hover:text-blue-700">{product.title}</Link>
                                        <p className="text-gray-600">{product.shortDescription}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-store-dark">${product.salePrice}</span>
                                            {product.price !== product.salePrice && (
                                                <span className="text-sm text-gray-500 line-through">${product.price}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <span className="text-yellow-500">★ {product.averageRating}</span>
                                            <span className="ml-2">({product.totalRating} reviews)</span>
                                        </div>
                                        <div className="mt-4 flex space-x-2">
                                            <Link href={`/product/${product._id}`} className="bg-store-dark text-white flex justify-center items-center w-full h-11 rounded-xl text-lg font-medium hover:bg-store-dark/90 active:bg-store-dark/80 duration-200">
                                                Buy Now
                                            </Link>
                                            <Button onClick={() => handelRemoveFromFav(product._id)} className="active:opacity-60 transition-all duration-200 h-11 text-lg rounded-xl font-medium">
                                                <Heart className="scale-150 fill-store-danger text-store-danger" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoriteProducts;
