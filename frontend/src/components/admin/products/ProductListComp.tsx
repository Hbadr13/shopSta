import { Checkbox } from "@/components/ui/checkbox"
import moment from "moment";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger }
    from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IApiProducts } from '@/interface/IApiProducts'
import { useState } from "react"
import { FiChevronDown, FiEdit3, FiEye, FiStar } from "react-icons/fi"
import { TooltipHover } from "@/components/common/TooltipHover";
import { Badge } from "@/components/ui/badge"
import { AiOutlineDelete } from "react-icons/ai";
import { AlertDialogDemo } from "@/components/common/AlertDialogCard";
import { useAppDispatch } from "@/redux/redux-hooks";
import { deleteProduct } from "@/features/admin/productActions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@heroui/button";
import Image from "next/image";
import { addToast } from "@heroui/react";


const DisplayAvailbleSize = ({ sizes, colors, productId }: { sizes: string[], colors: string[], productId: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const route = useRouter()
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
            <DropdownMenuTrigger asChild>
                <button
                    onClick={toggleDropdown}
                    className={`active:opacity-60 transition-all w-5 h-5 flex justify-center items-center active:bg-eco-blue-v2 duration-200 rounded-xl hover:scale-105 relative focus:outline-none focus:ring-0 ${isOpen ? "rotate-180" : "rotate-0"
                        } transition-transform`}
                >
                    <FiChevronDown />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[240px] mt-5 rounded-2xl '>
                <DropdownMenuLabel className=' px-4 py-2'>Sizes disponible</DropdownMenuLabel>
                <DropdownMenuGroup className='gap-2 px-3'>
                    {sizes.map((item, index) => (
                        <Badge variant={'outline'} key={index}>{item}</Badge>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="mt-2" />
                <DropdownMenuLabel className=' px-4 py-2'>Colors disponible</DropdownMenuLabel>
                <div className="grid  grid-cols-6 gap-2 px-3">
                    {colors.map((color, index) => (
                        <Badge
                            key={index}
                            className="w-7 h-5 rounded-full border border-gray-300"
                            style={{ backgroundColor: color.toLowerCase() }} />
                    ))}
                </div>
                <div className="w-full p-2 mt-2">
                    <Button
                        onPress={() => route.push('/admin/product/view/' + productId)}
                        className="active:opacity-60 transition-all duration-200 w-full rounded-2xl text-white font-bold bg-eco-blue-v0 text-center py-6"
                        variant="faded"
                    >
                        View all details
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const ProductListComp = ({ productList }: { productList: IApiProducts }) => {
    const route = useRouter()
    const dispatch = useAppDispatch()
    const handelDeleteProduct = ({ productId }: { productId: string }) => {
        dispatch(deleteProduct(productId)).then((data) => {
            addToast({
                title: data.payload.message,
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                color: 'success'

            })
        })
    }
    return (
        <Table className="rounded-xl w-[1500px]">
            <TableCaption>A list of your recent products.</TableCaption>
            <TableHeader className="border-0">
                <TableRow className=" border-b-0 h-10">
                    <TableHead className="bg-eco-blue-v5 px-4 py-2 text-start rounded-tl-3xl rounded-l-xl border-b-0">
                        <Checkbox />
                    </TableHead>
                    <TableHead className="bg-eco-blue-v5 px-4 py-2 text-start">Product Name & Size</TableHead>
                    <TableHead className="bg-eco-blue-v5 px-4 py-2 text-center">Product ID</TableHead>
                    <TableHead className="bg-eco-blue-v5 px-4 py-2 text-center">Price</TableHead>
                    <TableHead className="bg-eco-blue-v5 px-4 py-2 text-center">Sale price</TableHead>
                    <TableHead className="bg-eco-blue-v5 px-4 py-2 text-center">Sales</TableHead>
                    <TableHead className="bg-eco-blue-v5 px-4 py-2 text-center">Stock</TableHead>
                    <TableHead className="bg-eco-blue-v5 px-4 py-2 text-center">Audience</TableHead>
                    <TableHead className="bg-eco-blue-v5 px-4 py-2 text-center">Brand</TableHead>
                    <TableHead className="bg-eco-blue-v5 px-4 py-2 text-center">Rating</TableHead>
                    <TableHead className="bg-eco-blue-v5 px-4 py-2 text-center">Start date</TableHead>
                    <TableHead className="bg-eco-blue-v5 px-4 py-2 text-center rounded-r-xl">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="mt-8">
                {productList.products.map((product, index) => (
                    <TableRow
                        className={`h-20 border-0 hover:bg-eco-black-v3 hover:rounded-xl ${index % 2 ? "bg-eco-blue-v5" : "bg-white"
                            }`}
                        key={index}
                    >
                        <TableCell className="rounded-l-xl">
                            <div className="flex items-center space-x-2">
                                <Checkbox />
                                <Image width={300} height={400} alt="ss'" className="w-12 h-14 object-cover rounded-md" src={product.images[0]} />
                            </div>
                        </TableCell>
                        <TableCell className="text-center px-4 py-2 font-medium">
                            <div className="flex  space-x-4 items-center ">
                                <Link href={'/admin/product/view/' + product._id} className="hover:text-blue-500 duration-200">{product.title}</Link>
                                <DisplayAvailbleSize productId={product._id} colors={product.colors} sizes={product.sizes} />
                            </div>
                        </TableCell>
                        <TableCell className="text-center px-4 py-2">#{product.productID}</TableCell>
                        <TableCell className="text-center px-4 py-2">{product.price}</TableCell>
                        <TableCell className="text-center px-4 py-2">{product.salePrice}</TableCell>
                        <TableCell className="text-center px-4 py-2">{product.totalSale}</TableCell>
                        <TableCell className="text-center px-4 py-2 ">
                            {
                                product.quantity <= 0 ?
                                    <div className="bg-eco-orange-v0/10 text-eco-orange-v0 px-2 py-1 rounded-xl text-xs font-medium ">Out of stock</div> : product.quantity
                            }
                        </TableCell>
                        <TableCell className="text-center px-4 py-2 ">{product.audience}</TableCell>
                        <TableCell className="text-center px-4 py-2 ">{product.brand}</TableCell>
                        <TableCell className="text-center px-4 py-2 ">
                            <div className="flex items-center justify-end space-x-2">
                                <div className="flex items-center bg-eco-black-v2/10 rounded-md px-1.5 py-0.5">
                                    <div className="text-yellow-600">
                                        {product.averageRating}
                                    </div>
                                    <FiStar className="ml-1 text-yellow-400 fill-yellow-400" />
                                </div>
                                <div className="font-extralight">
                                    {product.totalRating} Review
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-center px-4 py-2  ">
                            <TooltipHover
                                TooltipTriggerContent={<div> {moment(product.createdAt).format('LL')}</div>}
                                TooltipContentContent={<div> {moment(product.createdAt).format('LLL')}</div>}
                            />
                        </TableCell>
                        <TableCell className="text-center px-4 py-2  rounded-r-xl ">
                            <div className="flex space-x-1">
                                <Button onPress={() => route.push('/admin/product/view/' + product._id)} radius="full"
                                    className="active:opacity-60 transition-all   hover:scale-[102%] w-8 h-7 bg-eco-blue-v0/10  text-eco-blue-v0 hover:bg-eco-blue-v0 hover:text-white duration-200 rounded-md p-1.5" isIconOnly aria-label="Like"  >
                                    <FiEdit3 strokeWidth={1.6} className="w-full h-full" />
                                </Button>
                                <Button onPress={() => route.push('/admin/product/edit/' + product._id)}
                                    className=" hover:scale-[102%] w-8 h-7 bg-eco-blue-v0/10 text-eco-blue-v0 hover:bg-eco-blue-v0 hover:text-white duration-200  rounded-md p-1.5" radius="full" isIconOnly >
                                    <FiEye strokeWidth={1.6} className="w-full h-full" />
                                </Button>
                                <AlertDialogDemo
                                    title={'Are you absolutely sure?'}
                                    triggerButton={
                                        <Button radius="full" className="active:opacity-60 transition-all  hover:scale-[102%] w-8 h-7 bg-red-100 hover:bg-red-500 hover:text-red-100 duration-200  rounded-md p-1.5 text-red-500" isIconOnly >
                                            <AiOutlineDelete className="w-full h-full" strokeWidth={1.6} />
                                        </Button>
                                    }
                                    description={<span className="">
                                        This action cannot be undone. This will permanently delete <span className="font-semibold text-eco-orange-v0/70">{product.title}</span> and remove it from your inventory.
                                    </span>}
                                    actionButton={<div>Continue</div>}
                                    cancelButton={<div>Cancel</div>}
                                    handelPressAction={() => handelDeleteProduct({ productId: product._id })}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default ProductListComp