"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/formatPrice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { FiArrowLeft, FiUser, FiMail, FiMapPin, FiCreditCard, FiCalendar, FiLock } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { createYourOrder } from "@/features/shop/order/orderAction";
import CheckoutSkeleton from "@/components/shimmer/CheckoutSkeleton";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import Image from "next/image";
import { clearCart } from "@/features/shop/cartSlice";
import { addToast } from "@heroui/react";

export default function CheckoutPage() {
    const { user, isLoading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch()
    const { cart } = useAppSelector((state) => state.cart);
    const subtotal: number = cart.reduce((acc, item) => acc + (item.product.salePrice || item.product.price) * item.quantity, 0);
    const totalItems: number = cart.reduce((acc, item) => acc + item.quantity, 0);
    const total = subtotal;
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [shippingAddress, setShippingAddress] = useState("khouribga 11");
    const [cardNumber, setCardNumber] = useState("2234 2342 3424 3423");
    const [expiryDate, setExpiryDate] = useState("11/11");
    const [cvv, setCvv] = useState("888");
    const [waiting, setWaiting] = useState(false)
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    const isDeliveryStepValid = fullName.trim() && fullName.length > 4 && email.trim() && isValidEmail(email) && shippingAddress.trim();
    const isPaymentStepValid =
        cardNumber.replace(/\s/g, "").length === 16 &&
        /^\d{2}\/\d{2}$/.test(expiryDate) &&
        (cvv.length === 3 || cvv.length === 4);


    const formatCardNumber = (value: string) => {
        return value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
    };

    const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatCardNumber(e.target.value);
        setCardNumber(formattedValue);
    };

    const handleExpiryDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (value.length <= 5 && /^\d{0,2}\/?\d{0,2}$/.test(value)) {
            if (value.length === 2 && !value.includes('/')) {
                value = value + '/';
            }
            setExpiryDate(value);
        }
    };

    const handleNextStep = () => {
        if (step === 1 && isDeliveryStepValid) {
            setStep(2);
        } else if (step === 2 && isPaymentStepValid) {
            setStep(3);
        }
    };

    useEffect(() => {
        if (user) {
            setFullName(user.userName)
            setEmail(user.email)
        }
    }, [user])

    const handelCompletePurchase = () => {
        setWaiting(true)
        dispatch(createYourOrder({
            cartItems: cart.map((item) => {
                return {
                    productId: item.product._id,
                    title: item.product.title,
                    image: item.product.images[0],
                    price: item.product.salePrice ? item.product.salePrice : item.product.price,
                    quantity: item.quantity,
                    brand: item.brand
                }
            }),
            addressInfo: {
                address: shippingAddress,
                city: 'khouribga',
                pincode: 'khouribga',
                phone: 'khouribga',
                notes: 'I want my products asap'

            },
            paymentMethod: "credit_card",
            paymentDetails: {
                cardNumber,
                expiryDate,
                cvv
            },
            totalAmount: subtotal,
            totalItems
        })).then((state) => {
            if (state.payload.success) {
                setWaiting(false)
                dispatch(clearCart())
                if (state.payload.order && state.payload.order.orderId)
                    router.push(`/checkout/order/${state.payload.order.orderId}/review`)
            }
            else {
                setWaiting(false)
                addToast({
                    title: state.payload.message,
                    color: 'danger',
                    timeout: 2000,
                    shouldShowTimeoutProgress: true,

                });
            }
        })
    }
    useEffect(() => {
        if (!user && !isLoading)
            router.push(`/auth/login?return_url=${encodeURIComponent('/checkout')}`);
    }, [user, isLoading])

    if (!user) {
        return <CheckoutSkeleton />
    }
    return (
        <div className="max-w-7xl  mx-auto px-4 py-2 md:py-16 lg:py-32 flex flex-col md:flex-row space-x-0 md:space-x-4 lg:space-x-10">
            <div className="w-full md:w-2/3">
                <div className="flex flex-col border-b py-6">
                    <div className="flex items-center space-x-2">
                        <IoBagCheckOutline className="w-6 h-6 -translate-y-0.5" />
                        <h1 className="text-2xl font-bold">Checkout</h1>
                    </div>
                    <div className="text-xl font-medium md:hidden">
                        <span className="text-gray-500">{totalItems} Items |</span> <span>{formatPrice(subtotal)} DH</span>
                    </div>
                </div>
                {cart.length == 0 ? <div className="text-xl w-full flex flex-col items-center space-y-4  text-center py-4">
                    <div className="">
                        Your cart is empty.
                    </div>
                    <Button variant="outline" className="w-max" size="sm" onClick={() => router.push('/')}>
                        <FiArrowLeft /> Back to Home
                    </Button>
                </div> :
                    <div>
                        <div className="relative py-4 border-b">
                            <div className="flex justify-between">
                                <button
                                    className={`${step === 1 ? 'font-bold' : 'text-gray-500'}`}
                                    onClick={() => setStep(1)}
                                >
                                    Delivery Options
                                </button>
                                <button
                                    className={`${step === 2 ? 'font-bold' : 'text-gray-500'} ${!isDeliveryStepValid && 'cursor-not-allowed'}`}
                                    onClick={() => isDeliveryStepValid && setStep(2)}
                                    disabled={!isDeliveryStepValid}
                                >
                                    Payment
                                </button>
                                <button
                                    className={`${step === 3 ? 'font-bold' : 'text-gray-500'} ${!isPaymentStepValid && 'cursor-not-allowed'}`}
                                    onClick={() => isPaymentStepValid && setStep(3)}
                                    disabled={!isPaymentStepValid}
                                >
                                    Short Review
                                </button>
                            </div>

                            {/* Progress Line */}
                            <div className="absolute bottom-0 left-0 h-1 bg-gray-200 w-full">
                                <div
                                    className="h-1 bg-black transition-all duration-300"
                                    style={{
                                        width: `${((step - 1) / 2) * 100}%`, // Calculate progress based on step
                                    }}
                                ></div>
                            </div>
                        </div>

                        {step === 1 && (
                            <div className="mt-4 space-y-4">
                                <div className="relative">
                                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Input
                                        placeholder="Full Name"
                                        className="w-full pl-10"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Input
                                        placeholder="Email Address"
                                        className="w-full pl-10"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="relative">
                                    <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Input
                                        placeholder="Shipping Address"
                                        className="w-full pl-10"
                                        value={shippingAddress}
                                        onChange={(e) => setShippingAddress(e.target.value)}
                                    />
                                </div>
                                <Button
                                    onClick={handleNextStep}
                                    className="w-full bg-black text-white h-14 rounded-full"
                                    disabled={!isDeliveryStepValid}
                                >
                                    Next: Payment
                                </Button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="mt-4 space-y-4 ">
                                <div className="relative">
                                    <FiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Input
                                        placeholder="Card Number"
                                        className="w-full pl-10"
                                        type="tel"
                                        value={cardNumber}
                                        onChange={handleCardNumberChange}
                                        maxLength={19} // 16 digits + 3 spaces
                                    />
                                </div>
                                <div className="relative">
                                    <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Input
                                        placeholder="Expiration Date (MM/YY)"
                                        className="w-full pl-10"
                                        value={expiryDate}
                                        onChange={handleExpiryDateChange}
                                        maxLength={10}
                                    />
                                </div>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Input
                                        placeholder="CVV"
                                        className="w-full pl-10"
                                        type="password"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                        maxLength={3}
                                    />
                                </div>
                                <Button
                                    onClick={handleNextStep}
                                    className="w-full bg-black text-white h-14 rounded-full"
                                    disabled={!isPaymentStepValid}
                                >
                                    Next: Short Review
                                </Button>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="mt-4 space-y-4">
                                {cart.map((item) => (
                                    <div key={item.id} className="border-b py-4 flex space-x-4">
                                        <Image width={80} height={80} src={item.product.images[0]} alt={item.product.title} className="w-20 h-20 object-cover rounded-md" />
                                        <div>
                                            <h2 className="font-semibold">{item.product.title}</h2>
                                            <p className="text-gray-500">{formatPrice(item.product.salePrice || item.product.price)} DH * {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                                <Button disabled={waiting} onClick={handelCompletePurchase} className={`${subtotal ? 'bg-black text-white' : 'bg-store-gray-200 hover:bg-store-gray-200 active:bg-black/60 cursor-not-allowed border-1 border-gray-400 text-black'} w-full h-14 rounded-full text-lg font-medium  `}>
                                    {

                                        waiting ? <div className="flex items-center space-x-2">
                                            <div className="border-r-4 animate-spinner-ease-spin w-10 h-10  rounded-full border-white">

                                            </div>
                                            <div className="">
                                                Processing…
                                            </div>
                                        </div> : 'Review order'
                                    }
                                </Button>
                                {/* <Button onClick={handelCompletePurchase} className="w-full bg-black text-white h-14 rounded-full active:bg-black/60">Complete Purchase</Button> */}
                            </div>
                        )}
                    </div>
                }
            </div>

            <div className="w-full md:w-1/3 bg-white rounded-lg p-4 md:p-8 space-y-4">
                <h2 className="text-2xl font-bold flex items-center">
                    <MdOutlineShoppingCartCheckout className="mr-2" /> In Your Bag
                </h2>
                <div className="text-lg flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)} DH</span></div>
                <div className="text-lg flex justify-between truncate"><span className="truncate">Estimated Shipping</span><span>{formatPrice(0)} DH</span></div>
                <div className="text-lg flex justify-between truncate"><span>Estimated Tax</span><span>{formatPrice(0)} DH</span></div>
                <div className="text-lg font-bold flex justify-between border-t pt-2"><span>Total</span><span>{formatPrice(total)} DH</span></div>
            </div>
        </div>

    );
}
