"use client";
import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "@/features/account/accountActions";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import Link from "next/link";
import { checkAuth } from "@/features/auth/authActions";

const AccountPage = () => {
    const dispatch = useAppDispatch();
    const { account, isLoading } = useAppSelector((state) => state.account);

    const [firstName, setfirstName] = useState(account?.firstName || "");
    const [lastName, setLastName] = useState(account?.lastName || "");

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);


    const handleProfileUpdate = () => {
        if (!account)
            return
        if (firstName !== account.firstName || lastName !== account.lastName) {
            dispatch(updateUserProfile({ firstName, lastName })).then(() => {
                dispatch(checkAuth())
            })
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Account Information</h1>

            {account && (
                <div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">Profile</h2>

                        {/* Editable fields for username and last name */}
                        <div className="mb-4">
                            <label className="block font-semibold">Username</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setfirstName(e.target.value)}
                                className="border p-2 w-full rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-semibold">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="border p-2 w-full rounded-md"
                            />
                        </div>

                        <p><strong>Email:</strong> {account.email}</p>
                        <p><strong>userName:</strong> {account.firstName}</p>
                        <p><strong>lastName:</strong> {account.lastName}</p>
                        <button
                            className="mt-4 bg-blue-500 text-white p-2 rounded"
                            onClick={handleProfileUpdate}
                        >
                            Update Profile
                        </button>
                    </div>

                    {/* Default Address */}
                    {account.addresses.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Default Address</h2>
                            {account.addresses.filter(addr => addr.isDefault).map((address, index) => (
                                <div key={index} className="border p-4 mb-4">
                                    <p><strong>Company:</strong> {address.company}</p>
                                    <p>Address1: {address.address1}</p>
                                    <p>City: {address.city}, {address.province}, {address.country}</p>
                                    <p>Postal Code: {address.postalCode}</p>
                                    <p><strong>Phone:</strong> {address.phone}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Link to Manage Addresses */}
                    <Link href="/account/addresses" className="bg-green-500 text-white p-2 rounded">
                        Manage Addresses
                    </Link>
                </div>
            )}
        </div>
    );
};

export default AccountPage;
