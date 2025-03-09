'use client';

import { checkAuth } from "@/features/auth/authActions";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const CheckAuth = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { user, isLoading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);
    useEffect(() => {
        if (isLoading) return;
        if (pathname.startsWith("/admin")) {
            if (!user) {
                router.replace("/auth/login");
            } else if (user.role === "admin" && pathname !== "/admin/dashboard") {
                router.replace("/admin/dashboard");
            }
        }
    }, [user, isLoading, router, pathname]);

    return children;
};

export default CheckAuth;
