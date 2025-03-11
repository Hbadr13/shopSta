"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

const NewsletterPopup = () => {
    const [email, setEmail] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("hidePopup") === "true") return;
        const delayTimer = setTimeout(() => setShowPopup(true), 1800);
        return () => clearTimeout(delayTimer);
    }, []);

    const handleClose = () => {
        setShowPopup(false);
    };
    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((e.target as HTMLDivElement).id === "popup-overlay") {
            handleClose();
        }
    };
    const handleHidePopup = () => {
        localStorage.setItem("hidePopup", "true"); // Prevent future popups
        handleClose();
    };
    if (!showPopup) return null;
    return (
        <motion.div
            id="popup-overlay"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
            onClick={handleClickOutside}
        >
            <motion.div
                initial={{ opacity: 0, translateY: -20 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 40 }}
                className="bg-white rounded-lg shadow-lg w-full max-w-xl relative overflow-hidden">
                <button
                    onClick={handleClose}
                    className="active:opacity-60 transition-all duration-200 absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                >
                    <X size={24} />
                </button>
                <div className="p-6">
                    <div className=" py-5 md:py-10">

                        <h2 className="text-xl font-bold w-full text-center">Don{`'`}t Miss a Thing</h2>
                        <p className="text-xl text-gray-600 mt-2 w-full text-center">
                            Join our newsletter and get <strong>10% off</strong> your first order.
                        </p>
                    </div>
                    <div className="hidden md:flex">
                        <input
                            type="email"
                            className="w-full p-3 border rounded-l"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="active:opacity-60 transition-all duration-200 bg-store-footer-hover text-white p-3 rounded-r hover:opacity-80 duration-200 active:opacity-60">
                            Subscribe
                        </button>
                    </div>
                    <div className="block md:hidden">
                        <input
                            type="email"
                            className="w-full mt-4 p-2 md:p-3 border rounded"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="active:opacity-60 transition-all duration-200 w-full mt-4 bg-blue-500 text-white p-2 md:p-3 rounded hover:bg-blue-600">
                            Subscribe
                        </button>
                    </div>
                    <div className="mt-4 flex items-center">
                        <button
                            onClick={handleHidePopup}
                            className="active:opacity-60 transition-all duration-200 w-full mt-2 flex items-center space-x-1"
                        >
                            <input className="w-4 h-4 md:w-5 md:h-5 border-0 cursor-pointer" type="checkbox" />
                            <div className=" text-sm md:text-base">
                                Don{`'`}t show this popup again
                            </div>
                        </button>
                    </div>
                </div>
                <Image width={1000} height={1000} src="/cover.png" alt="Newsletter Cover" className="w-full aspect-auto object-cover" />

            </motion.div>
        </motion.div>
    );
};

export default NewsletterPopup;
