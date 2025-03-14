'use client';

import { checkAuth } from "@/features/auth/authActions";
import { useAppDispatch } from "@/redux/redux-hooks";
import { ReactNode, useEffect } from "react";

const CheckAuth = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return children;
};

export default CheckAuth;
