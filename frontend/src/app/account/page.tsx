"use client";
import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "@/features/account/accountActions";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import Link from "next/link";
import { checkAuth, logout } from "@/features/auth/authActions";
import { addToast } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { AlertDialogDemo } from "@/components/common/AlertDialogCard";

const AccountPage = () => {
    const dispatch = useAppDispatch();
    const { account, isLoading } = useAppSelector((state) => state.account);
    const [open, setOpen] = useState(false)
    const [firstName, setfirstName] = useState(account?.firstName || "");
    const [lastName, setLastName] = useState(account?.lastName || "");

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);


    const handleProfileUpdate = () => {
        if (!account)
            return
        if (firstName !== account.firstName || lastName !== account.lastName) {
            dispatch(updateUserProfile({ firstName, lastName })).then((data) => {
                dispatch(checkAuth())
                if (data.payload.success) {
                    addToast({
                        title: data.payload.message,
                        timeout: 2500,
                        color: 'default',
                        shouldShowTimeoutProgress: true
                    })
                }

            })
        }
    };

    if (!account) return <div>Loading...</div>;

    return (
        <div className=" max-w-[1500px] mx-auto  p-1 md:p-4 mt-10 w-full">
            <h1 className="text-4xl font-bold mb-4 w-full flex justify-center capitalize">{account.firstName} {account.lastName}</h1>
            <div className=" p-3 md:p-6 lg:p-10 ">
                <div className="bg-muted rounded-md  p-3 lg:p-8 flex flex-col md:flex-row w-full space-y-6 md:space-y-0 space-x-0 md:space-x-10">
                    <div className=" w-full md:w-1/2 ">
                        <h2 className="p-5 text-2xl font-semibold text-slate-700">My account</h2>
                        <div className="space-y-5 flex flex-col">

                            <div className="text-lg">
                                <div className="flex items-center space-x-2">
                                    <div>Email:</div>
                                    <div className="">
                                        {account.email}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div>
                                        First name:
                                    </div> <div>
                                        {account.firstName}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div>
                                        Last name:
                                    </div>
                                    <div>
                                        {account.lastName}
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <button onClick={() => setOpen((prv) => !prv)} className="active:opacity-65 underline  text-xl">
                                    Edit profile
                                </button>
                            </div>

                            {open && <div className="">
                                <div className="mb-4">
                                    <label className="block ">First name</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setfirstName(e.target.value)}
                                        className="border p-2 w-full rounded-md"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block">Last Name</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="border p-2 w-full rounded-md"
                                    />
                                </div>
                                <Button
                                    disabled={isLoading}
                                    className="mt-4  text-slate-600 border-slate-600 border bg-muted hover:bg-slate-100 duration-200 active:opacity-65 p-2 rounded"
                                    onClick={handleProfileUpdate}
                                >
                                    Update Profile
                                </Button>
                            </div>}
                            <Link href={'/account/addresses'} className="active:opacity-65 underline  text-xl">
                                View addresses ({account.addresses.length})
                            </Link>
                            <div className="">
                                <AlertDialogDemo
                                    title={'Are you sure you want to log out?'}
                                    triggerButton={
                                        <button className="active:opacity-65 underline  text-xl"  >
                                            Log out
                                        </button>
                                    }
                                    description={<span className="">Log out of ShopSta as {account.email} </span>}
                                    actionButton={<div>Log out</div>}
                                    cancelButton={<div>Cancel</div>}
                                    handelPressAction={() => dispatch(logout())}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="w-full md:w-1/2  border-t md:border-t-0">
                        <div className="p-5  text-2xl font-semibold text-slate-700">Account details</div>
                        {account.addresses.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold">Default Address</h2>
                                {account.addresses.filter(addr => addr.isDefault).map((address, index) => (
                                    <div key={index} className="   text-slate-600">
                                        <div><strong>Company : </strong> {address.company}</div>
                                        <div><strong>Address1 : </strong> {address.address1}</div>
                                        <div><strong>Address2 : </strong> {address.address2}</div>
                                        <div><strong>Country : </strong> {address.country}</div>
                                        <div><strong>City : </strong> {address.city}</div>
                                        <div><strong>Province : </strong> {address.province}</div>
                                        <div><strong>Postal Code : </strong> {address.postalCode}</div>
                                        <div><strong>Phone : </strong> {address.phone}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
};

export default AccountPage;
