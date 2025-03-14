"use client";
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


import { useEffect, useState } from "react";
import { addAddress, deleteAddress, updateAddress, getUserProfile } from "@/features/account/accountActions";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { AddressData } from "@/features/account/accountSlice";
import { addToast } from "@heroui/react";
import Link from 'next/link';
import { IoAddCircleOutline } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { AlertDialogDemo } from '@/components/common/AlertDialogCard';

const AddressPage = () => {
    const dispatch = useAppDispatch();
    const { account, isLoading } = useAppSelector((state) => state.account);
    const [open, setOpen] = useState(false)

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
        dispatch(addAddress(newAddress)).then((data) => {
            addToast({
                title: data.payload.message,
                timeout: 2500,
                color: 'default',
                shouldShowTimeoutProgress: true
            })

        })
        setOpen(false)

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
        dispatch(deleteAddress(addressId)).then((data) => {
            if (data.payload.success) {
                addToast({
                    title: data.payload.message,
                    timeout: 2500,
                    color: 'default',
                    shouldShowTimeoutProgress: true
                })
            }

        })
    };

    const handleUpdateAddress = () => {
        if (editAddress) {
            const updatedAddress = { ...editAddress, ...newAddress };
            if (!validateAddress(updatedAddress)) return;
            dispatch(updateAddress(updatedAddress)).then((data) => {
                addToast({
                    title: data.payload.message,
                    timeout: 2500,
                    color: 'default',
                    shouldShowTimeoutProgress: true
                })

            })
            setEditAddress(null);
            setNewAddress(updatedAddress);
            setOpen(false)
        }
    };

    const handleEditAddress = (address: AddressData) => {
        setEditAddress(address);
        setNewAddress({ ...address });
        setOpen(true)
    };

    const handleCancel = () => {
        setEditAddress(null);
        setOpen(false)
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

    if (!account) return <div className="h-[70vh] w-full"></div>;

    return (
        <div className=" max-w-[1500px] mx-auto  p-1 md:p-4 mt-10 w-full">
            <h1 className="text-4xl font-bold mb-4 w-full flex justify-center capitalize">Your addresses</h1>
            <div className=" p-3 md:p-6 lg:p-10 ">
                <Link href={'/account'} className='underline py-2 text-lg opacity-80 active:opacity-60'>Return to account details</Link>
                <div className=" rounded-mdw-full space-y-6   mt-3">
                    <div className="mb-6">
                        {account.addresses.map((address, index) => (
                            <div key={index} className="border p-4 mb-4">
                                <div><strong>Company : </strong> {address.company}</div>
                                <div><strong>Address1 : </strong> {address.address1}</div>
                                <div><strong>Address2 : </strong> {address.address2}</div>
                                <div><strong>Country : </strong> {address.country}</div>
                                <div><strong>City : </strong> {address.city}</div>
                                <div><strong>Province : </strong> {address.province}</div>
                                <div><strong>Postal Code : </strong> {address.postalCode}</div>
                                <div><strong>Phone : </strong> {address.phone}</div>
                                <div className="">{address.isDefault && 'Default address'}</div>
                                <div className="flex space-x-4">
                                    <AlertDialogDemo
                                        title={'Are you sure you want to delete this address?'}
                                        triggerButton={
                                            <Button
                                                className="mt-4  text-slate-600 border-slate-600 border bg-muted hover:bg-slate-100 duration-200 active:opacity-65 py-2 px-5 rounded">
                                                Delete
                                            </Button>
                                        }
                                        description={<span className="">This action cannot be undone. The address will be permanently removed from your account. </span>}
                                        actionButton={<div>Continue</div>}
                                        cancelButton={<div>Cancel</div>}
                                        handelPressAction={() => handleDeleteAddress(address._id)}
                                    />
                                    <Button
                                        disabled={isLoading}
                                        className="mt-4  text-slate-600 border-slate-600 border bg-muted hover:bg-slate-100 duration-200 active:opacity-65 py-2 px-5 rounded"
                                        onClick={() => handleEditAddress(address)}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {!editAddress && <div className=" w-full bg-muted  ">
                        <button onClick={() => setOpen(true)} className='w-full h-32 md:h-44 flex justify-center items-center group'>
                            <IoAddCircleOutline className='w-16 h-16 md:w-24 md:h-24 opacity-45 group-hover:opacity-70 duration-200' />
                        </button>
                    </div>}

                    <div className="">
                        {open && <div className="mb-6">
                            <h2 className="text-xl font-semibold p-3">{editAddress ? "Edit Address" : "Add a new address"}</h2>
                            <div>
                                <input type="text" name="company" placeholder="Company" value={newAddress.company} onChange={handleChange} className=" bg-muted border p-2 mb-2 w-full" />
                                <input type="text" name="address1" placeholder="Address Line 1" value={newAddress.address1} onChange={handleChange} className="bg-muted border p-2 mb-2 w-full" />
                                <input type="text" name="address2" placeholder="Address Line 2" value={newAddress.address2} onChange={handleChange} className="bg-muted border p-2 mb-2 w-full" />
                                <input type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleChange} className="bg-muted border p-2 mb-2 w-full" />
                                <input type="text" name="country" placeholder="Country" value={newAddress.country} onChange={handleChange} className="bg-muted border p-2 mb-2 w-full" />
                                <input type="text" name="province" placeholder="Province" value={newAddress.province} onChange={handleChange} className="bg-muted border p-2 mb-2 w-full" />
                                <input type="text" name="postalCode" placeholder="Postal Code" value={newAddress.postalCode} onChange={handleChange} className="bg-muted border p-2 mb-2 w-full" />
                                <PhoneInput
                                    country={'ma'}
                                    value={newAddress.phone}
                                    onChange={(e) => setNewAddress((prv) => { return { ...prv, phone: e } })}
                                    containerStyle={{
                                        width: '100%',
                                        marginBottom: '8px',
                                    }}
                                    inputStyle={{
                                        border: '1px solid #e5e7eb',
                                        width: '100%',
                                        borderRadius: '1px',
                                        height: '41px',
                                        outline: 'none',
                                        backgroundColor: '#F5F5F5',
                                        color: 'black',
                                    }}
                                    buttonStyle={{
                                        backgroundColor: '#f0f0f0',
                                        borderRight: '1px solid #e5e7eb',
                                        paddingRight: '8px',
                                    }}
                                />

                                <div className="flex items-center mb-2  space-x-2">
                                    <input className='w-4 h-4' type="checkbox" checked={newAddress.isDefault} onChange={() => setNewAddress({ ...newAddress, isDefault: !newAddress.isDefault })} />
                                    <label className="mr-2">Set as default address</label>
                                </div>
                                <div className=" space-x-4">

                                    {editAddress ? (
                                        <Button
                                            disabled={isLoading}
                                            className="mt-4  text-slate-600 border-slate-600 border bg-muted hover:bg-slate-100 duration-200 active:opacity-65 p-2 rounded"
                                            onClick={handleUpdateAddress}
                                        >
                                            Update Address
                                        </Button>
                                    ) : (
                                        <Button
                                            disabled={isLoading}
                                            className="mt-4  text-slate-600 border-slate-600 border bg-muted hover:bg-slate-100 duration-200 active:opacity-65 p-2 rounded"
                                            onClick={handleAddAddress}
                                        >
                                            Add Address
                                        </Button>
                                    )}
                                    <Button
                                        disabled={isLoading}
                                        className="mt-4  text-slate-600 border-slate-600 border bg-muted hover:bg-slate-100 duration-200 active:opacity-65 p-2 rounded"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>}
                    </div>


                </div>
            </div>
        </div>

        // <div className=" max-w-[1700px] mx-auto  p-1 md:p-4 mt-10 w-full ">
        //     <h1 className="text-4xl font-bold mb-4 w-full flex justify-center capitalize">Your addresses</h1>

        //     <div className=" p-3 md:p-6 lg:p-10  bg-muted">
        //         <Link href={'/account'} className='underline'>Return to account details</Link>
        // <div className="mb-6">
        //     {account.addresses.map((address, index) => (
        //         <div key={index} className="border p-4 mb-4">
        //             id:{address._id}
        //             <div><strong>Company:</strong> {address.company}</div>
        //             <div>Address1: {address.address1}</div>
        //             <div>Address2: {address.address2}</div>
        //             <div>City: {address.city}, {address.province}, {address.country}</div>
        //             <div>Postal Code: {address.postalCode}</div>
        //             <div><strong>Phone:</strong> {address.phone}</div>
        //             <div><strong>Is Default:</strong> {address.isDefault ? "Yes" : "No"}</div>
        //             <button
        //                 className="bg-red-500 text-white p-2 rounded mt-2"
        //                 onClick={() => handleDeleteAddress(address._id)}
        //             >
        //                 Delete
        //             </button>
        //             <button
        //                 className="bg-yellow-500 text-white p-2 rounded mt-2 ml-2"
        //                 onClick={() => handleEditAddress(address)}
        //             >
        //                 Edit
        //             </button>
        //         </div>
        //     ))}
        // </div>
        // {!isLoading && <div className="mb-6">
        //     <h2 className="text-xl font-semibold">{editAddress ? "Edit Address" : "Add Address"}</h2>
        //     <div>
        //         <input type="text" name="company" placeholder="Company" value={newAddress.company} onChange={handleChange} className="border p-2 mb-2 w-full" />
        //         <input type="text" name="address1" placeholder="Address Line 1" value={newAddress.address1} onChange={handleChange} className="border p-2 mb-2 w-full" />
        //         <input type="text" name="address2" placeholder="Address Line 2" value={newAddress.address2} onChange={handleChange} className="border p-2 mb-2 w-full" />
        //         <input type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleChange} className="border p-2 mb-2 w-full" />
        //         <input type="text" name="country" placeholder="Country" value={newAddress.country} onChange={handleChange} className="border p-2 mb-2 w-full" />
        //         <input type="text" name="province" placeholder="Province" value={newAddress.province} onChange={handleChange} className="border p-2 mb-2 w-full" />
        //         <input type="text" name="postalCode" placeholder="Postal Code" value={newAddress.postalCode} onChange={handleChange} className="border p-2 mb-2 w-full" />
        //         <PhoneInput
        //             country={'ma'}
        //             value={newAddress.phone}
        //             onChange={(e) => setNewAddress((prv) => { return { ...prv, phone: e } })}
        //             containerStyle={{
        //                 width: '100%',
        //                 marginBottom: '8px',
        //             }}
        //             inputStyle={{
        //                 border: '1px solid #ccc',
        //                 width: '100%',
        //                 borderRadius: '1px',
        //                 height: '41px',
        //                 outline: 'none',
        //                 backgroundColor: 'white',
        //                 color: 'black',
        //             }}
        //             buttonStyle={{
        //                 backgroundColor: '#f0f0f0',
        //                 borderRight: '1px solid #ccc',
        //                 paddingRight: '8px',
        //             }}
        //         />

        //         <div className="flex items-center mb-2">
        //             <label className="mr-2">Is Default</label>
        //             <input type="checkbox" checked={newAddress.isDefault} onChange={() => setNewAddress({ ...newAddress, isDefault: !newAddress.isDefault })} />
        //         </div>
        //         {editAddress ? (
        //             <button className="bg-yellow-500 text-white p-2 rounded" onClick={handleUpdateAddress}>
        //                 Update Address
        //             </button>
        //         ) : (
        //             <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAddAddress}>
        //                 Add Address
        //             </button>
        //         )}
        //     </div>
        // </div>}
        //     </div>
        // </div>
    );
};

export default AddressPage;


