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
    navigationMenuTriggerStyle,
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
            <NavigationMenuList>
                {
                    addProductFormElements.map((it) =>
                        it.name == 'productInfo' && it.items.map((item) =>
                            item.name == 'category' && item.options &&
                            item.options.map((opt, index3) =>
                                <NavigationMenuItem key={index3}>
                                    <NavigationMenuTrigger>{opt.label}</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="p-4 font-medium">

                                            <ul className="bg-gradient-to-b from-muted/50 rounded-xl to-muted grid w-[400px] gap-3 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                                {opt.categories?.map((catg, index4) => (
                                                    <ListItem
                                                        key={index4}
                                                        title={catg.label}
                                                        href={`/products/${opt.label.toLocaleLowerCase()}/${catg.id}`}
                                                    >
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
                    <button onClick={handelClickOnOrder} >
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            orders
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
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default ShopNavigationMenuDemo