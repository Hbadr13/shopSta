"use client";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/features/auth/authActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, User2 } from "lucide-react";
import { useAppDispatch } from "@/redux/redux-hooks";
import { addToast, Input } from "@heroui/react";
import { MdOutlineEmail } from "react-icons/md";

const AuthRegister = () => {
    const dispatch = useAppDispatch();
    const route = useRouter();

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(registerUser(formData)).then((data) => {
            if (data?.payload?.success) {
                addToast({
                    title: data?.payload?.message,
                    shouldShowTimeoutProgress: true,
                    color: 'success',
                    timeout: 3000

                });
                route.push("/auth/login");
            } else {
                addToast({
                    title: data?.payload?.message,
                    color: "danger",
                    shouldShowTimeoutProgress: true,
                    timeout: 3000

                });
            }
        });
    };

    return (
        <div className="mx-auto w-full max-w-md space-y-6 ">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Create new account
                </h1>
                <p className="mt-2">
                    Already have an account?
                    <Link
                        className="font-medium ml-2 text-primary hover:underline"
                        href="/auth/login"
                    >
                        Login
                    </Link>
                </p>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
                <Input
                    type="text"
                    name="userName"
                    label="Username"
                    value={formData.userName}
                    onChange={handleInputChange}
                    required
                    endContent={<User2 className="w-7 h-7 mb-1 text-stone-500" />}
                />
                <Input
                    type="email"
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    endContent={<MdOutlineEmail className="w-7 h-7 mb-1 text-stone-500" />}

                />
                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        label="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                        {showPassword ? <EyeOff className="w-7 h-7 mb-1 text-stone-500" /> : <Eye className="w-7 h-7 mb-1 text-stone-500" />}
                    </button>
                </div>
                <Button type="submit" className="active:opacity-70 transition-all duration-200 mt-2 w-full">
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

export default AuthRegister;
