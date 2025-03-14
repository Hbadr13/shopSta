
"use client"
export const dynamicParams = true;
import { payTheOrder } from "@/features/shop/order/orderAction";
import { useAppDispatch } from "@/redux/redux-hooks";
import { addToast } from "@heroui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";


const Page = () => {
    const dispatch = useAppDispatch();
    const { orderId } = useParams<{ orderId: string }>();
    const router = useRouter();

    useEffect(() => {
        if (dispatch && orderId && typeof orderId === "string") {

            dispatch(payTheOrder({ orderId, paymentStatus: 'paid' })).then((state) => {
                if (state.payload.success) {
                    addToast({
                        title: state.payload.message,
                        color: 'success',
                        description: `Order id: ${orderId}`,
                        timeout: 2000
                    })
                    router.push(`/checkout/order/${orderId}/thank-you`);
                }
                else {
                    addToast({
                        title: state.payload.message,
                        color: state.payload.message != 'Order has already been paid' ? 'success' : 'danger',
                        description: `Order id: ${orderId}`,
                        timeout: 2000
                    })
                    setTimeout(() => {
                        if (state.payload.message == 'Order has already been paid')
                            router.push(`/order/${orderId}/view`);
                        else
                            router.push(`/`);
                    }, 2000);
                }
            });
        }
    }, [dispatch, orderId]);

    return (
        <div className="bg-white w-full h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center items-center space-y-4">
                <div className=" animate-spin w-20 h-20 rounded-full border-5 border-store-primary border-b-transparent"></div>

                <div className="">your order being processed.</div>

            </div>
        </div>
    )
}
export default Page