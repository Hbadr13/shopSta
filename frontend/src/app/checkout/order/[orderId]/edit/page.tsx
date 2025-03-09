'use client';

import { useParams } from 'next/navigation';
import React from 'react';

const EditPage = () => {
    const { orderId } = useParams<{ orderId: string }>();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
            <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                <h1 className="text-3xl font-bold mb-2">Coming Soon</h1>
                <p className="text-lg text-gray-600">We’re working on this page. Stay tuned!</p>
                <p className="mt-4 text-gray-500">Order ID: <span className="font-semibold">{orderId}</span></p>
            </div>
        </div>
    );
};

export default EditPage;