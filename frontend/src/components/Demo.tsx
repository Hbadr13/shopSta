"use client"
import React from 'react'
import WindowProps from "@/components/WindowProps";
import { Toaster } from "@/components/ui/toaster";
import CheckAuth from "@/components/CheckAuth";
import Providers from "@/lib/Providers";
import NewsletterPopup from "@/components/shop/NewsletterPopup";
import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from "@heroui/toast";
import ShopNavbar from "@/layout/ShopNavbar";
import Footer from "@/layout/shopFooter";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const Demo = (
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>
) => {
    const pathname = usePathname()

    return (
        <div
            className={`  ${geistSans.variable} ${geistMono.variable} antialiased ${pathname.startsWith('/admin') ? 'adminFont1' : 'fontfamily1'} `}

        >

            <Providers>
                <HeroUIProvider>
                    <CheckAuth>
                        <WindowProps />
                        <ToastProvider placement="top-right" />
                        {
                            !pathname.startsWith('/admin') && <>
                                <ShopNavbar />
                                <NewsletterPopup />
                            </>
                        }
                        <div className={`${pathname.startsWith('/admin') ? '' : 'pt-[120px]'}`}>
                            {children}
                        </div>
                        {
                            !pathname.startsWith('/admin') && <Footer />
                        }
                        <Toaster />
                    </CheckAuth>
                </HeroUIProvider>
            </Providers>
        </div>

    )
}

export default Demo