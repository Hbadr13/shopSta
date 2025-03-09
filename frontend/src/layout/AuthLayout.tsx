"use client";
import { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-auto lg:min-h-screen w-full">
            <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
                <div className="max-w-md space-y-6 text-center text-primary-foreground">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        Welcome to ECommerce Shopping
                    </h1>
                </div>
            </div>
            <div className="flex flex-1  items-start  lg:items-center justify-center  px-4 py-12 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;
