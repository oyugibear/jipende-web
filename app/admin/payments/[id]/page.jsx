'use client'

import { API_URL } from '@/config/api.config'
import { useAuth } from '@/context/AuthContext'
import { Descriptions, message } from 'antd'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ConfirmationModal from '@/components/Constants/Modals/ConfirmationModal'
import { useRouter } from 'next/navigation'
import { PiArrowLeft, PiTrash, PiEye, PiCalendar, PiUser, PiCurrencyDollar, PiCreditCard, PiReceipt, PiCheckCircle, PiXCircle, PiClock, PiBank, PiDownload } from 'react-icons/pi'
import { FiRefreshCw } from 'react-icons/fi'
import dayjs from 'dayjs'
import Link from 'next/link'

export default function PaymentDetailPage() {
    const [payment, setPayment] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { id } = useParams()
    const [refresh, setRefresh] = useState(false)
    const router = useRouter()
    const { token } = useAuth()

    const getData = async () => {
        try {
            setLoading(true)
            setError(null)
            
            if (!token) {
                setError('Authentication required')
                return
            }
            
            const response = await axios.get(`${API_URL}/payments/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.data && response.data.data) {
                setPayment(response.data.data)
            } else {
                setError('Payment not found')
            }
        } catch (error) {
            console.error("Error fetching payment:", error)
            setError('Failed to load payment details. Please try again.')
            setPayment(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id && token) {
            getData()
        }
    }, [id, refresh, token])

    const handleGoBack = () => {
        router.push('/admin')
    }

    const handleRetry = () => {
        getData()
    }

    const items = [
        {
            key: '1',
            label: 'Client Name',
            children: (
                <div className="flex items-center gap-1">
                    <PiUser size={16} className="text-blue-500" />
                    <span className="font-medium">{`${payment?.postedBy?.first_name || ''} ${payment?.postedBy?.second_name || ''}`.trim() || 'Unknown Client'}</span>
                </div>
            )
        },
        {
            key: '2',
            label: 'Client Email',
            children: (
                <div className="flex items-center gap-1">
                    <PiUser size={16} className="text-green-500" />
                    <span>{payment?.postedBy?.email || 'No email provided'}</span>
                </div>
            )
        },
        {
            key: '3',
            label: 'Amount',
            children: (
                <div className="flex items-center gap-1">
                    <PiCurrencyDollar size={16} className="text-green-500" />
                    <span className="font-semibold text-green-600">{payment?.currency || 'KSH'} {payment?.final_amount_invoiced || '0'}</span>
                </div>
            )
        },
        {
            key: '4',
            label: 'VAT Amount',
            children: (
                <div className="flex items-center gap-1">
                    <PiReceipt size={16} className="text-purple-500" />
                    <span>KSH {payment?.vat || '0'}</span>
                </div>
            )
        },
        {
            key: '5',
            label: 'Currency',
            children: (
                <div className="flex items-center gap-1">
                    <PiCurrencyDollar size={16} className="text-orange-500" />
                    <span>{payment?.currency || 'Not specified'}</span>
                </div>
            )
        },
        {
            key: '6',
            label: 'Payment Method',
            children: (
                <div className="flex items-center gap-1">
                    <PiCreditCard size={16} className="text-indigo-500" />
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                        {payment?.payment_method || 'Not specified'}
                    </span>
                </div>
            )
        },
        {
            key: '7',
            label: 'Payment Gateway',
            children: (
                <div className="flex items-center gap-1">
                    <PiBank size={16} className="text-cyan-500" />
                    <span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded text-xs font-medium">
                        {payment?.paymentType || 'Not specified'}
                    </span>
                </div>
            )
        },
        {
            key: '8',
            label: 'Payment Date',
            children: payment?.payment_date ? (
                <div className="flex items-center gap-1">
                    <PiCalendar size={16} className="text-gray-500" />
                    <span>{dayjs(payment.payment_date).format('MMMM D, YYYY [at] h:mm A')}</span>
                </div>
            ) : 'Not available'
        },
        {
            key: '9',
            label: 'Payment Status',
            children: (
                <div className="flex items-center gap-1">
                    {payment?.payment_status === 'completed' || payment?.payment_status === 'success' ? (
                        <PiCheckCircle size={16} className="text-green-500" />
                    ) : (
                        <PiXCircle size={16} className="text-red-500" />
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment?.payment_status === 'completed' || payment?.payment_status === 'success'
                            ? 'bg-green-100 text-green-700' 
                            : payment?.payment_status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : payment?.payment_status === 'failed'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700'
                    }`}>
                        {payment?.payment_status || 'Unknown'}
                    </span>
                </div>
            )
        },
        {
            key: '10',
            label: 'Booking ID',
            children: (
                <div className="flex items-center gap-1">
                    <PiReceipt size={16} className="text-gray-500" />
                    <span className="font-mono text-sm">{payment?.booking_id?._id || 'Not linked'}</span>
                </div>
            )
        },
        {
            key: '11',
            label: 'Payment ID',
            children: (
                <div className="flex items-center gap-1">
                    <PiReceipt size={16} className="text-gray-500" />
                    <span className="font-mono text-sm">{payment?._id || 'Not available'}</span>
                </div>
            )
        },
        {
            key: '12',
            label: 'Created Date',
            children: payment?.createdAt ? (
                <div className="flex items-center gap-1">
                    <PiClock size={16} className="text-gray-500" />
                    <span>{dayjs(payment.createdAt).format('MMMM D, YYYY [at] h:mm A')}</span>
                </div>
            ) : 'Not available'
        }
    ]

    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const handleDelete = async () => {
        try {
            setDeleting(true)
            
            if (!token) {
                message.error('Authentication required')
                return
            }
            
            const { data } = await axios.delete(`${API_URL}/payment/${payment?._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (data) {
                message.success('Payment deleted successfully')
                setDeleteOpen(false)
                router.push('/admin')
            }
        } catch (error) {
            console.error("Delete error:", error)
            message.error('Failed to delete payment. Please try again.')
        } finally {
            setDeleting(false)
        }
    }

    const showDeleteModal = () => {
        setDeleteOpen(true)
    }

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mb-6 mx-auto"></div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Payment Details</h3>
                    <p className="text-gray-500">Please wait while we fetch the payment information...</p>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center max-w-md">
                    <div className="bg-red-50 rounded-full p-6 mb-6 mx-auto w-fit">
                        <FiRefreshCw size={48} className="text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Payment</h3>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={handleRetry}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                        >
                            <FiRefreshCw size={16} />
                            Try Again
                        </button>
                        <button
                            onClick={handleGoBack}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                        >
                            <PiArrowLeft size={16} />
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // No payment found
    if (!payment) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center max-w-md">
                    <div className="bg-gray-50 rounded-full p-6 mb-6 mx-auto w-fit">
                        <PiEye size={48} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Not Found</h3>
                    <p className="text-gray-600 mb-6">The payment you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={handleGoBack}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
                    >
                        <PiArrowLeft size={16} />
                        Back to Admin
                    </button>
                </div>
            </div>
        )
    }

    console.log("Payment data: ", payment)

    return (
        <div className='flex flex-col w-full items-center justify-center py-8 px-4 min-h-screen bg-gray-50'>
            <div className='max-w-[1200px] w-full'>
                {/* Header */}
                <div className='flex items-center justify-between mb-8 text-sm'>
                    <div className='flex items-center gap-4'>
                        <button 
                            onClick={handleGoBack}
                            className='flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors duration-200'
                        >
                            <PiArrowLeft size={20} />
                            <span className='text-sm'>Back to Admin</span>
                        </button>
                    </div>
                    <h1 className='text-base font-bold text-gray-900'>Payment Details</h1>
                </div>

                {/* Payment Content */}
                <div className='bg-white rounded-lg shadow-sm p-6 md:p-8'>
                    {/* Payment Info and Actions */}
                    <div className='flex flex-col lg:flex-row gap-6 mb-8'>
                        {/* Quick Info */}
                        <div className='lg:w-2/3 flex flex-col justify-between'>
                            <div>
                                <h2 className='text-xl md:text-2xl font-bold text-gray-900 mb-4'>
                                    Payment
                                </h2>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                                    <div className='text-center p-3 bg-gray-50 rounded-lg'>
                                        <PiCurrencyDollar size={20} className='mx-auto text-green-500 mb-1' />
                                        <div className='text-xs text-gray-500'>Amount</div>
                                        <div className='font-medium text-sm text-green-600'>{payment?.currency || 'KSH'} {payment?.final_amount_invoiced || '0'}</div>
                                    </div>
                                    <div className='text-center p-3 bg-gray-50 rounded-lg'>
                                        <PiCreditCard size={20} className='mx-auto text-indigo-500 mb-1' />
                                        <div className='text-xs text-gray-500'>Method</div>
                                        <div className='font-medium text-sm'>{payment?.payment_method || 'N/A'}</div>
                                    </div>
                                    <div className='text-center p-3 bg-gray-50 rounded-lg'>
                                        {payment?.payment_status == 'paid'  ? (
                                            <PiCheckCircle size={20} className='mx-auto text-green-500 mb-1' />
                                        ) : (
                                            <PiXCircle size={20} className='mx-auto text-red-500 mb-1' />
                                        )}
                                        <div className='text-xs text-gray-500'>Status</div>
                                        <div className='font-medium text-sm capitalize'>{payment?.payment_status || 'N/A'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className='flex gap-3 self-start text-xs'>
                                <button  
                                    onClick={showDeleteModal} 
                                    disabled={deleting}
                                    className='flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200'
                                >
                                    <PiTrash size={16} />
                                    {deleting ? 'Deleting...' : 'Delete Payment'}
                                </button>
                                <Link href={payment?.receipt_pdf} target="_blank" download>
                                    <button  
                                        className='flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200'
                                    >
                                        <PiDownload size={16} />
                                        Download Receipt
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Information */}
                    <div className='border-t border-gray-200 pt-6'>
                        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Payment Information</h3>
                        <Descriptions 
                            bordered 
                            layout="vertical" 
                            items={items}
                            className="custom-descriptions"
                        />
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal 
                isOpen={deleteOpen} 
                setIsOpen={setDeleteOpen} 
                handleFunction={handleDelete}
                title="Delete Payment"
                message={`Are you sure you want to delete this payment record? This action cannot be undone.`}
                confirmText="Delete Payment"
                cancelText="Cancel"
            />
        </div>
    )
}
