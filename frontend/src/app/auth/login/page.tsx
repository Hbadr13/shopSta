"use client";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/features/auth/authActions";
import { useToast } from "@/hooks/use-toast";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@heroui/react";
import { MdOutlineEmail } from "react-icons/md";

const Login = () => {
    const dispatch: AppDispatch = useDispatch();
    const { toast } = useToast();
    const route = useRouter();
    const searchParams = useSearchParams();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    // Function to handle input changes
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(loginUser(formData)).then((data) => {
            const returnUrl = searchParams.get("return_url");

            if (data?.payload?.success) {
                toast({ title: data?.payload?.message });
                route.push(returnUrl || "/");
            } else {
                toast({ title: data?.payload?.message });
            }
        });
    };

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Sign in to your account
                </h1>
                <p className="mt-2">
                    Don&apos;t have an account?
                    <Link
                        className="font-medium ml-2 text-primary hover:underline"
                        href="/auth/register"
                    >
                        Register
                    </Link>
                </p>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
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
                <Button type="submit" className="mt-2 w-full">
                    Sign In
                </Button>
            </form>
        </div>
    );
};

export default Login;
