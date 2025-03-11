"use client"

import BrandLogos from "@/components/shop/BrandLogos";
import Features from "@/components/shop/Features";
import HeroBanner from "@/components/shop/HeroBanner";
import LargeFashionCards from "@/components/shop/LargeFashionCards";
import ProductShopList from "@/components/shop/ProductShopList";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { getfavorites } from "@/features/shop/favorite/favorite.action";
import { getAllProducts } from "@/features/shop/productAction";
import { useAppDispatch } from "@/redux/redux-hooks";
import { AppDispatch } from "@/redux/store";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { FiShoppingCart } from "react-icons/fi";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
export default function Home() {
  const devRef = useRef<HTMLDivElement | null>(null)
  const dispatch: AppDispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getfavorites())
  }, [])
  const handelScroling = () => {
    devRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div className="">

      <HeroBanner />
      <div className="max-w-7xl mx-auto px-4 py-8">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="text-center py-16  rounded-lg"
        >
          <h1 className="text-4xl font-bold">Welcome to Shopsta</h1>
          <p className="mt-4 text-lg text-gray-600">Your one-stop destination for high-quality products and exceptional customer service.</p>
          <Button onPress={handelScroling} className="active:opacity-70 transition-all duration-200 mt-6 bg-black text-white h-12 rounded-full px-8">
            <FiShoppingCart className="mr-2" /> Shop Now
          </Button>
        </motion.div>
      </div>
      <div ref={devRef} className=""></div>
      <ProductShopList page='main' />
      <Features />
      <DropdownMenuSeparator className="bg-store-secondary/15" />
      <LargeFashionCards />
      <BrandLogos />
    </div>
  );
}
