

"use client";
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


import { useEffect, useState } from "react";
import { addAddress, deleteAddress, updateAddress, getUserProfile } from "@/features/account/accountActions";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { AddressData } from "@/features/account/accountSlice";
import { addToast } from "@heroui/react";

const AddressPage = () => {
    const dispatch = useAppDispatch();
    const { account, isLoading, message } = useAppSelector((state) => state.account);

    const [newAddress, setNewAddress] = useState<AddressData>({
        _id: "",
        company: "",
        address1: "",
        address2: "",
        city: "",
        country: "",
        province: "",
        postalCode: "",
        phone: "",
        isDefault: false,
    });

    const [editAddress, setEditAddress] = useState<AddressData | null>(null);

    useEffect(() => {
        if (message)
            addToast({
                title: message,
                timeout: 2500,
                color: 'default',
                shouldShowTimeoutProgress: true
            })
    }, [message]);

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    const validateAddress = (address: AddressData) => {
        const requiredFields = ["address1", "city", "country", "province", "postalCode", "phone"];
        for (const field of requiredFields) {
            if (!address[field as keyof AddressData]) {
                addToast({ title: `${field} is required`, timeout: 2500, color: 'danger' });
                return false;
            }
        }
        return true;
    };

    const handleAddAddress = () => {
        if (!validateAddress(newAddress)) return;
        dispatch(addAddress(newAddress));
        setNewAddress({
            _id: "",
            company: "",
            address1: "",
            address2: "",
            city: "",
            country: "",
            province: "",
            postalCode: "",
            phone: "",
            isDefault: false,
        });
    };

    const handleDeleteAddress = (addressId: string) => {
        dispatch(deleteAddress(addressId));
    };

    const handleUpdateAddress = () => {
        if (editAddress) {
            const updatedAddress = { ...editAddress, ...newAddress };
            if (!validateAddress(updatedAddress)) return;
            dispatch(updateAddress(updatedAddress));
            setEditAddress(null);
            setNewAddress(updatedAddress);
        }
    };

    const handleEditAddress = (address: AddressData) => {
        setEditAddress(address);
        setNewAddress({ ...address });
    };

    if (!account) return <div className="h-[70vh] w-full"></div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Addresses</h1>

            <div className="mb-6">
                {account.addresses.map((address, index) => (
                    <div key={index} className="border p-4 mb-4">
                        id:{address._id}
                        <div><strong>Company:</strong> {address.company}</div>
                        <div>Address1: {address.address1}</div>
                        <div>Address2: {address.address2}</div>
                        <div>City: {address.city}, {address.province}, {address.country}</div>
                        <div>Postal Code: {address.postalCode}</div>
                        <div><strong>Phone:</strong> {address.phone}</div>
                        <div><strong>Is Default:</strong> {address.isDefault ? "Yes" : "No"}</div>
                        <button
                            className="bg-red-500 text-white p-2 rounded mt-2"
                            onClick={() => handleDeleteAddress(address._id)}
                        >
                            Delete
                        </button>
                        <button
                            className="bg-yellow-500 text-white p-2 rounded mt-2 ml-2"
                            onClick={() => handleEditAddress(address)}
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>
            {!isLoading && <div className="mb-6">
                <h2 className="text-xl font-semibold">{editAddress ? "Edit Address" : "Add Address"}</h2>
                <div>
                    <input type="text" name="company" placeholder="Company" value={newAddress.company} onChange={handleChange} className="border p-2 mb-2 w-full" />
                    <input type="text" name="address1" placeholder="Address Line 1" value={newAddress.address1} onChange={handleChange} className="border p-2 mb-2 w-full" />
                    <input type="text" name="address2" placeholder="Address Line 2" value={newAddress.address2} onChange={handleChange} className="border p-2 mb-2 w-full" />
                    <input type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleChange} className="border p-2 mb-2 w-full" />
                    <input type="text" name="country" placeholder="Country" value={newAddress.country} onChange={handleChange} className="border p-2 mb-2 w-full" />
                    <input type="text" name="province" placeholder="Province" value={newAddress.province} onChange={handleChange} className="border p-2 mb-2 w-full" />
                    <input type="text" name="postalCode" placeholder="Postal Code" value={newAddress.postalCode} onChange={handleChange} className="border p-2 mb-2 w-full" />
                    <PhoneInput
                        country={'ma'}
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress((prv) => { return { ...prv, phone: e } })}
                        containerStyle={{
                            width: '100%',
                            marginBottom: '8px',
                        }}
                        inputStyle={{
                            border: '1px solid #ccc',
                            width: '100%',
                            borderRadius: '1px',
                            height: '41px',
                            outline: 'none',
                            backgroundColor: 'white',
                            color: 'black',
                        }}
                        buttonStyle={{
                            backgroundColor: '#f0f0f0',
                            borderRight: '1px solid #ccc',
                            paddingRight: '8px',
                        }}
                    />

                    {/* <PhoneInput type="text" name="phone" placeholder="Phone" value={phoneNumber} onChange={setphoneNumber} className="border p-2 mb-2 w-full" /> */}
                    <div className="flex items-center mb-2">
                        <label className="mr-2">Is Default</label>
                        <input type="checkbox" checked={newAddress.isDefault} onChange={() => setNewAddress({ ...newAddress, isDefault: !newAddress.isDefault })} />
                    </div>
                    {editAddress ? (
                        <button className="bg-yellow-500 text-white p-2 rounded" onClick={handleUpdateAddress}>
                            Update Address
                        </button>
                    ) : (
                        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAddAddress}>
                            Add Address
                        </button>
                    )}
                </div>
            </div>}
        </div>
    );
};

export default AddressPage;


