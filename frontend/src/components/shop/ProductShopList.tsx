
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
            {isLoading && loadingStatus != 'Loading favorites' ?
                <div className="w-full h-[700px] bg-store-secondary/10 animate-pulse">

                </div>
                :
                <div className="grid  grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 p-2 md:gap-4 md:p-4 lg:p-6 lg:gap-6">
                    {productList?.products.concat(productList.products).concat(productList.products).map((product, index) => (
                        <ProductCard page={page} favoritesProductIds={favoritesProductIds} key={index} product={product} />
                    ))}
                </div>}
        </div>
    );
};



export default ProductShopList;
