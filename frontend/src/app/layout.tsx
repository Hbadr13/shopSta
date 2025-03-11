'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import CheckAuth from "@/components/CheckAuth";
import Providers from "@/lib/Providers";
import { usePathname } from "next/navigation";
import ShopNavbar from "@/layout/ShopNavbar";
import Footer from "@/layout/shopFooter";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/redux-hooks";
import { setWindowWidth } from "@/features/global/windowProps";
import NewsletterPopup from "@/components/shop/NewsletterPopup";
import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from "@heroui/toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };



const WindowProps = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const updateWindowWidth = () => {
      dispatch(setWindowWidth(window.innerWidth))
    };

    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);
  return <div className=""></div>
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname()

  return (
    <html lang="en">
      <body
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
              <div className="">
                {children}
              </div>
              {
                !pathname.startsWith('/admin') && <Footer />
              }
              <Toaster />
            </CheckAuth>
          </HeroUIProvider>
        </Providers>
      </body>
    </html>
  );
}
export default RootLayout