"use client"
import { changeOrderStatus, getAllProductsByAdmin } from '@/features/admin/ordersActions'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { addToast } from '@heroui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaEye, FaTrash, FaTruck, FaCreditCard, FaMoneyBillWave, FaPaypal } from 'react-icons/fa'
import { FiCheckCircle, FiChevronDown, FiClock, FiRefreshCw, FiTruck, FiXCircle, FiXOctagon } from 'react-icons/fi'

const Page = () => {
  const dispatch = useAppDispatch()
  const { isLoading, ordersList } = useAppSelector((state) => state.adminOrders)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    dispatch(getAllProductsByAdmin())
  }, [dispatch])


  const handelChangeOrderStatus = ({ orderId, status }: { orderId: string, status: string }) => {
    setLoading(true)
    dispatch(changeOrderStatus({ orderId, status })).then((data) => {
      setLoading(false)
      if (data.payload.success)
        addToast({ title: data.payload.message, timeout: 2000, shouldShowTimeoutProgress: true })
      else
        addToast({ title: data.payload.message, color: 'danger' })
    })
  }
  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'credit_card': return <FaCreditCard className="inline mr-1" />
      case 'cod': return <FaMoneyBillWave className="inline mr-1" />
      case 'paypal': return <FaPaypal className="inline mr-1" />
      case 'stripe': return <FaCreditCard className="inline mr-1" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'paid': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'refunded': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  if (isLoading) return <div className="text-center py-8">Loading orders...</div>
  if (!ordersList || ordersList.length === 0) return <div className="text-center py-8">No orders found</div>
  return (
    <div className="container mx-auto px-4 py-8 bg-white rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="  bg-slate-100/70">
            <tr>
              <th className="py-3 px-4 text-left">Products</th>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Total Price</th>
              <th className="py-3 px-4 text-left">Items</th>
              <th className="py-3 px-4 text-left">Payment</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Tracking</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className=" ">
            {ordersList.map((order, index) => (
              <tr key={index} className={` ${index % 2 ? 'bg-slate-100/70 rounded-l-2xl' : ''} hover:bg-gray-50`}>
                {/* Products */}
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-md object-cover"
                        src={order.cartItems[0]?.image || '/placeholder-product.jpg'}
                        alt={order.cartItems[0]?.title || 'Product'}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{order.cartItems[0]?.title || 'Product'}</p>
                      {order.cartItems.length > 1 && (
                        <p className="text-sm text-gray-500">+{order.cartItems.length - 1} more</p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Order ID */}
                <td className="py-4 px-4">
                  <p className="text-sm font-mono">{order._id.substring(0, 8)}...</p>
                </td>

                {/* Total Price */}
                <td className="py-4 px-4">
                  <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
                </td>

                {/* Total Items */}
                <td className="py-4 px-4">
                  <p>{order.totalItems}</p>
                </td>

                {/* Payment */}
                <td className="py-4 px-4">
                  <div>
                    <span className="capitalize">
                      {getPaymentIcon(order.paymentMethod)}
                      {order.paymentMethod.replace('_', ' ')}
                    </span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </td>

                {/* Order Status */}
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                </td>


                <td className="py-4 px-4">
                  <div className="flex space-x-2">


                    <div className="relative">
                      <select
                        disabled={loading}
                        className={`${loading ? 'opacity-60 animate-pulse' : ''} appearance-none pl-8 pr-10 py-2 border rounded-md text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        value={order.orderStatus}
                        onChange={(e) => {
                          handelChangeOrderStatus({ orderId: order._id, status: e.target.value })
                          // console.log(`Change order ${order._id} to ${e.target.value}`);
                          // Add your status update logic here
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <div className="absolute left-3 top-2.5 pointer-events-none">
                        {order.orderStatus === "pending" && <FiClock className="text-yellow-500" />}
                        {order.orderStatus === "processing" && <FiRefreshCw className="text-blue-500" />}
                        {order.orderStatus === "shipped" && <FiTruck className="text-purple-500" />}
                        {order.orderStatus === "delivered" && <FiCheckCircle className="text-green-500" />}
                        {order.orderStatus === "cancelled" && <FiXOctagon className="text-red-500" />}
                      </div>
                      <FiChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </td>
                {/* Actions */}
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <Link href={`/admin/orders/details/${order._id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                      title="View order"
                    >
                      <FaEye />
                    </Link>
                    <button
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                      title="Delete order"
                    >
                      <FaTrash />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page