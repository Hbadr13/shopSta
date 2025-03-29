
import ProductCard from "./ProductCard";
import { useAppSelector } from "@/redux/redux-hooks";


const ProductShopList = ({ page }: { page: 'main' | 'filter' }) => {
    const { productList, isLoading } = useAppSelector((state) => state.shopProductSlice)
    const { loadingStatus, favoritesProductIds } = useAppSelector((state) => state.favoriteSlice)

    return (
        <div className="">
            {page == 'main' && <div className="relative mt-20 flex justify-center">
                <div className="text-center text-5xl relative z-10 bg-white  w-max  px-5">
                    Our product
                </div>
                <div className="w-full h-[0.5px] bg-store-gray-200 absolute z-0 top-1/2"></div>
            </div>}
            {!productList || (isLoading && loadingStatus != 'Loading favorites') ?
                <div className="grid  grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 p-2 md:gap-4 md:p-4 lg:p-6 lg:gap-6">
                    {Array.from({ length: 10 }).map((_, index) => <div key={index} className="animate-pulse p-5">
                        <div className="bg-store-secondary/10  w-full h-[300px] md:h-[380px] xl:h-[450px] rounded-xl">

                        </div>
                        <div className=" space-y-4 mt-4">
                            <div className="h-5 w-36 bg-store-secondary/10 rounded-md " />
                            <div className="w-full flex items-center justify-center space-x-2">
                                {Array.from({ length: 3 }).map((_, index) => <div key={index} className="rounded-md h-7 w-14 bg-store-secondary/10 " />)}
                            </div>
                            <div className="h-5 w-28 bg-store-secondary/10  rounded-md" />
                        </div>
                    </div>)}
                </div>
                :
                <div className="grid  grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 p-2 md:gap-4 md:p-4 lg:p-6 lg:gap-6">
                    {productList.products.map((product, index) => (
                        <ProductCard page={page} favoritesProductIds={favoritesProductIds} key={index} product={product} />
                    ))}
                </div>
            }
        </div>
    );
};



export default ProductShopList;
