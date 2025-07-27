"use client"

import React, { useState } from 'react'
import { message } from 'antd'
import { useAuth } from '@/context/AuthContext'
import { bookingAPI } from '@/utils/api'
import { reset } from '@/app/GlobalRedux/Features/cart/CartSlice'; 
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PiLock, PiCreditCard, PiUser } from 'react-icons/pi'

export default function Checkout({cart}) {
    const [processing, setProcessing] = useState(false)
    let tax = (cart?.totalAmount || 0) * 0.16
    const { user, isAuthenticated } = useAuth()

    const router = useRouter()
    const dispatch = useDispatch()

    const handleClick = async (e) => {
        e.preventDefault();
        
        if (!isAuthenticated) {
            message.warning('Please login to continue');
            router.push('/auth/login');
            return;
        }

        if (!cart.products || cart.products.length === 0) {
            message.warning('Your cart is empty');
            return;
        }
        
        setProcessing(true)
        
        try {
            const bookingData = {
                services: cart.products,
                final_amount: cart.totalAmount,
                vat: tax,
            };

            const response = await bookingAPI.create(bookingData);
            
            if (response && response.status) {
                message.success("Redirecting to payment...");
                dispatch(reset());
                localStorage.removeItem('cart');
                
                if (response.data.paymentLink) {
                    window.location.href = response.data.paymentLink;
                } else {
                    message.error("Payment link is not available");
                    setProcessing(false)
                }
            } else {
                message.error(response?.message || "Payment processing failed");
                setProcessing(false)
            }
        } catch (error) {
            console.log(error)
            message.error("Payment processing failed. Please try again.")
            setProcessing(false)   
        }
    }

    const itemCount = cart?.products?.length || 0
    const subtotal = cart?.totalAmount || 0
    const total = subtotal + tax
    
    return (
        <div className='flex flex-col w-full p-6 bg-white rounded-lg shadow-sm'>
            {/* Header */}
            <div className='flex items-center gap-2 mb-6'>
                <PiCreditCard size={24} className='text-yellow-500' />
                <h2 className='text-xl font-semibold text-gray-900'>Order Summary</h2>
            </div>

            {/* Items Count */}
            {itemCount > 0 && (
                <div className='bg-gray-50 rounded-lg p-3 mb-4'>
                    <p className='text-sm text-gray-600'>
                        {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart
                    </p>
                </div>
            )}

            {/* Price Breakdown */}
            <div className='space-y-4 mb-6'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Subtotal:</span>
                    <span className='font-semibold text-gray-900'>
                        KSH {subtotal.toLocaleString()}
                    </span>
                </div>
                
                <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>VAT (16%):</span>
                    <span className='font-semibold text-gray-900'>
                        KSH {tax.toLocaleString()}
                    </span>
                </div>
                
                <hr className='border-gray-200' />
                
                <div className='flex justify-between items-center text-lg'>
                    <span className='font-semibold text-gray-900'>Total:</span>
                    <span className='font-bold text-yellow-600'>
                        KSH {total.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Security Notice */}
            <div className='flex items-center gap-2 text-xs text-gray-500 mb-4 p-2 bg-gray-50 rounded'>
                <PiLock size={14} />
                <span>Secure payment powered by Paystack</span>
            </div>

            {/* Action Button */}
            <div className='w-full'>
                {!isAuthenticated ? (
                    <Link href='/auth/login' className='block w-full'>
                        <button className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2'>
                            <PiUser size={20} />
                            Sign in to continue
                        </button>
                    </Link>
                ) : (
                    <button 
                        onClick={handleClick}
                        disabled={processing || itemCount === 0}
                        className='w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2'
                    >
                        <PiCreditCard size={20} />
                        {processing ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Processing...
                            </>
                        ) : (
                            `Pay KSH ${total.toLocaleString()}`
                        )}
                    </button>
                )}
            </div>

            {/* Terms */}
            <p className='text-xs text-gray-500 text-center mt-4'>
                By proceeding, you agree to our{' '}
                <Link href='/terms' className='text-yellow-600 hover:underline'>
                    Terms of Service
                </Link>
            </p>
        </div>
    )
}
