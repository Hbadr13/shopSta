"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useAppSelector } from "@/redux/redux-hooks"
import { useRouter } from "next/navigation"
import { addProductFormElements } from "@/config"

export function ShopNavigationMenuDemo() {
    const { user } = useAppSelector((state) => state.auth)
    const router = useRouter()
    const handelClickOnOrder = () => {
        if (user)
            router.push("/orders")
        else
            router.push(`/auth/login?return_url=${encodeURIComponent('/orders')}`)
    }
    return (
        <NavigationMenu>
            <NavigationMenuList className="">
                {
                    addProductFormElements.map((it) =>
                        it.name == 'productInfo' && it.items.map((item) =>
                            item.name == 'category' && item.options &&
                            item.options.map((opt, index3) =>
                                <NavigationMenuItem key={index3}>
                                    <NavigationMenuTrigger className="text-sm md:text-lg px-1 py-2 md:px-3 md:py-2.5 font-medium  ">{opt.label}</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="p-4 font-medium">

                                            <ul className="bg-gradient-to-b from-muted/30 rounded-xl to-muted grid w-[230px]  gap-1 md:gap-3  p-1 md:p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                                {opt.categories?.map((catg, index4) => (
                                                    <ListItem
                                                        key={index4}
                                                        // title={catg.label}
                                                        href={`/products/${opt.label.toLocaleLowerCase()}/${catg.id}`}
                                                    >
                                                        <div
                                                            className="font-medium text-lg"

                                                        >
                                                            {catg.label}
                                                        </div>
                                                    </ListItem>
                                                ))}
                                            </ul>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            )
                        )
                    )
                }
                <NavigationMenuItem>
                    <button className="active:opacity-60 transition-all duration-200" onClick={handelClickOnOrder} >
                        <NavigationMenuLink className={'px-1 py-2 md:px-3 md:py-2.5 font-medium text-sm md:text-lg  hover:bg-muted duration-200 rounded-md'}>
                            orders
                        </NavigationMenuLink>
                    </button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <button onClick={() => router.push('/products/all/best-seller')} className="active:opacity-60 transition-all duration-200"  >
                        <NavigationMenuLink className={'px-1 py-2 md:px-3 md:py-2.5 font-medium text-sm md:text-lg hover:bg-muted duration-200 rounded-md'}>
                            products
                        </NavigationMenuLink>
                    </button>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={href || '/'}
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default ShopNavigationMenuDemo