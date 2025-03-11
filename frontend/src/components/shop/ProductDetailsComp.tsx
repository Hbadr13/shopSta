import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { Badge } from "@/components/ui/badge";
import { InnerImageZoom } from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import { Product } from '@/interface/IApiProducts'
import { addToCart } from '@/features/shop/cartSlice'
import { Button } from '@heroui/button'
import { Button as Buttton } from '@/components/ui/button'
import { Button as ShButton } from '@/components/ui/button'
import { addProductTofavorites, deleteProductFromFavorites } from '@/features/shop/favorite/favorite.action'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'

const ProductGallery = ({ product }: { product: { images: string[] } }) => {
    const inneref = useRef<HTMLDivElement | null>(null);
    const [divBHeight, setDivBHeight] = useState(0);
    const [currentSelectedImage, setCurrentSelectedImage] = useState<string | null>(product.images[0] || null);
    const [windowHeight, setWindowHeight] = useState(window?.innerWidth || 1);


    useEffect(() => {
        const updateHeight = () => {
            setWindowHeight(window?.innerWidth || 1);
            if (inneref.current) {
                setDivBHeight(inneref.current.clientHeight || 1);
            }
        };

        setTimeout(updateHeight, 100);
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, [currentSelectedImage]);

    const RenderLeftImages = () => (
        <div
            style={{ height: divBHeight }}
            className="w-full md:w-16  space-x-2 md:space-x-0 space-y-0 md:space-y-2 flex flex-row md:flex-col "
        >
            {product.images.map((url, index) => (
                <div key={index} className="relative w-12 h-14 truncate">
                    {url && (
                        <>
                            <Image width={300} height={500}
                                src={url}
                                alt="Uploaded Preview"
                                className="w-full h-full rounded-md object-cover"
                            />
                            <div
                                onMouseEnter={() => setCurrentSelectedImage(url)}
                                className={`absolute inset-0 ${url === currentSelectedImage ? "bg-black/20" : ""} rounded-md flex items-center justify-center cursor-pointer`}
                            />
                        </>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div style={{ height: divBHeight + 100 }} className='overflow-hidden'>
            <div className="overflow-hidden flex  space-x-2 w-full">
                {windowHeight >= 768 && <RenderLeftImages />}
                {currentSelectedImage && (
                    <div ref={inneref} className="w-full h-full rounded-xl object-cover overflow-hidden">
                        <InnerImageZoom className='rounded-md' src={currentSelectedImage} zoomSrc={currentSelectedImage} />
                    </div>
                )}
            </div>
            {windowHeight < 768 && <RenderLeftImages />}
        </div>
    );
};


const ProductDetailsComp = ({ product, type }: { product: Product, type: 'page' | 'dialog' }) => {
    const dispatch = useAppDispatch();
    const [selectSize, setSelectSize] = useState('')
    const [selectColor, setSelectColor] = useState('')
    const [quantity, setquantity] = useState(1)
    const [vibrate, setVibrate] = useState(false);
    const { loadingStatus, favoritesProductIds } = useAppSelector((state) => state.favoriteSlice)
    const { user } = useAppSelector((state) => state.auth)
    const router = useRouter()
    const pathname = usePathname()

    const handelAddProductToCart = () => {
        if (!selectSize || !selectColor) {
            setVibrate(true)
            return
        }
        dispatch(addToCart({ product, brand: product.brand, size: selectSize, quantity, color: selectColor, id: Date.now() }))
    }
    const handelBuyProduct = () => {
        if (!selectSize || !selectColor) {
            setVibrate(true)
            return
        }
        dispatch(addToCart({ product, brand: product.brand, size: selectSize, quantity, color: selectColor, id: Date.now() }))
        router.push('/cart')
    }
    const handelAddToFavorites = (productId: string) => {
        if (!user) {
            router.push(`/auth/login?return_url=${encodeURIComponent(pathname)}`);
            return
        }
        dispatch(addProductTofavorites({ productId: productId }))
    }
    const handelremoveFavorites = (productId: string) => {
        dispatch(deleteProductFromFavorites({ productId: productId }))
    }
    return (

        <div className="flex flex-col md:flex-row  space-y-1 md:space-x-10  max-w-7xl mx-auto">
            <div className={`${type == 'page' ? ' h-auto md:min-h-screen' : ' '}  w-full md:w-3/5`}>
                <div className={type == 'page' ? "sticky top-4" : 'sticky top-4'}>
                    <ProductGallery product={product} />
                </div>
            </div>
            <div className="w-full md:w-2/5">
                <div className="flex justify-between items-center">

                    <h2 className="text-2xl font-semibold">{product.title}</h2>
                    <Buttton
                        disabled={loadingStatus == 'Adding product' || loadingStatus == 'Removing product'}
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            favoritesProductIds.indexOf(product._id) === -1
                                ? handelAddToFavorites(product._id)
                                : handelremoveFavorites(product._id)
                        }
                    >
                        <Heart size={20} className={`${favoritesProductIds.indexOf(product._id) != -1 ? 'text-red-500 fill-red-500 group-hover/button:fill-white group-hover/button:text-white' : 'text-gray-700 group-hover/button:text-white'}  duration-300 `} />

                    </Buttton>
                </div>
                <span className=" mt-2 text-eco-black-v1/70 capitalize font-semibold">{product.shortDescription}</span>
                <div className="mt-4 flex items-center">
                    {product.salePrice ? (
                        <>
                            <span className="text-red-500 font-bold text-2xl">{product.salePrice}DH</span>
                            <span className="text-gray-400 line-through ml-2 text-xl">{product.price}DH</span>
                            <Badge className="ml-2 bg-red-500 text-white">Promo</Badge>
                        </>
                    ) : (
                        <span className="text-black font-bold text-2xl">{product.price}DH</span>
                    )}
                </div>
                <div className={`mt-10 space-y-2  rounded-xl ${vibrate && !selectSize ? 'border-store-footer-hover border p-1' : ''}`}>
                    <div className="">Available sizes</div>
                    {product.sizes.map((size, index) => (
                        <Button

                            onPress={() => setSelectSize(size)}
                            key={index}
                            className={`active:opacity-60 transition-all duration-200 ${selectSize == size ? 'border-store-gray-900' : 'border-store-gray-300'} bg-white border-[1.3px]  hover:border-store-gray-900 duration-300 text-store-dark text-large  mr-2 px-5 py-2 rounded-md`}>
                            {size}
                        </Button>
                    ))}
                </div>
                <div className={`mt-4 space-y-2 rounded-xl ${vibrate && !selectColor ? 'border-store-footer-hover border p-1' : ''}`}>
                    <div className="">Available colors</div>
                    <div className="flex gap-2">
                        {product.colors.map((color, index) => (
                            <Button
                                size='sm'
                                onPress={() => setSelectColor(color)}
                                key={index}
                                className={`active:opacity-60 transition-all duration-200  ${color == selectColor ? 'border-store-gray-600 border-separate border-3' : 'border'} w-8 opacity-70 rounded-md`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>
                <div className=" mt-7 flex items-center space-x-2 border rounded-xl w-max">
                    <Button disabled={quantity == 1} variant='light' size="md" onPress={quantity > 1 ? () => setquantity((prv) => prv - 1) : undefined} className={`active:opacity-60 transition-all duration-200 ${quantity ? '' : ' cursor-not-allowed'}`}>-</Button>
                    <span className="px-4">{quantity}</span>
                    <Button className='active:opacity-60 transition-all duration-200' variant='light' size="md" onPress={() => setquantity((prv) => prv + 1)}>+</Button>
                </div>

                <div className="mt-6 flex flex-col space-y-2">
                    <ShButton onClick={handelAddProductToCart} className="w-full h-14 rounded-full text-lg font-medium">Add to Bag</ShButton>
                    <ShButton onClick={handelBuyProduct} variant="outline" className="w-full h-14 rounded-full text-lg font-medium">
                        Buy it now
                    </ShButton>
                </div>
                <div className="mt-20">
                    <p className="text-gray-950 font-medium">{product.description.text}</p>
                    <div className="mt-4">
                        {product.description.details.map((detail, index) => (
                            <div key={index} className="flex justify-start space-x-2">
                                <span className="text-sm font-medium text-gray-500">{detail.label}</span>
                                <span className="text-sm text-gray-700">{detail.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};
export default ProductDetailsComp 