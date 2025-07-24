"use client"

import React, { useState } from 'react'
import CheckoutLabel from './CheckoutLabel'
import { message } from 'antd'
import { useAuth } from '@/context/AuthContext'
import { bookingAPI } from '@/utils/api'
import { reset } from '@/app/GlobalRedux/Features/cart/CartSlice'; 
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Checkout({cart}) {

    // console.log(cart)

    let tax = cart.totalAmount * 0.16
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
        
        try {
            const bookingData = {
                services: cart.products,
                final_amount: cart.totalAmount,
                vat: tax,
            };

            const response = await bookingAPI.create(bookingData);
            
            if (response && response.status) {
                message.success("Kindly pay for your order to proceed");
                dispatch(reset());
                
                console.log("Payment link", response.data.paymentLink)
                if (response.data.paymentLink) {
                    window.location.href = response.data.paymentLink;
                } else {
                    message.error("Payment link is not available");
                }
            } else {
                message.error(response?.message || "Your Payment Has Not Gone Through");
            }
        } catch (error) {
            console.log(error)
            message.error("Your Payment Has Not Gone Through")   
        }
    }
    
    return (
    <div className='flex flex-col w-full max-w-[400px] my-4 md:my-0 md:p-6'>
        <h2 className='text-2xl font-semibold text-center md:text-start'>Order Summary</h2>

        <div className='flex flex-col mt-8'>
            {/* <CheckoutLabel label="Subtotal" amount={3000}/> */}
            <div className='flex flex-col my-4'>
                <div className='flex flex-row items-center justify-between mb-4'>
                    <p className=''>Subtotal:</p>
                    <p className='font-semibold'>Ksh {cart.totalAmount}</p>
                </div>
                <hr />
            </div>
            <div className='flex flex-col my-4'>
                <div className='flex flex-row items-center justify-between mb-4'>
                    <p className=''>VÄT (16%):</p>
                    <p className='font-semibold'>Ksh {tax || 0}</p>
                </div>
                <hr />
            </div>
            <div className='flex flex-col my-4'>
                <div className='flex flex-row items-center justify-between mb-4'>
                    <p className=''>Total:</p>
                    <p className='font-semibold'>Ksh {cart.totalAmount + tax}</p>
                </div>
                <hr />
            </div>
        </div>

        <div className='w-full flex flex-row items-center justify-between gap-3 my-4'>
            {/* <button onClick={() => setPaymentOptionClicked("Card")} className='bg-black text-sm w-full text-white py-4'>
                Pay With Card
            </button> */}
            {!isAuthenticated ? (
                <Link href='/auth/login'>
                    <button className='bg-[#FFD02A] text-sm w-full px-4 text-black py-4'>
                        Sign in to continue
                    </button>
                </Link>
            ) : (
                <button onClick={(e) => handleClick(e)} className='bg-[#FFD02A] text-sm w-full text-black py-4'>
                    Pay Now
                </button>
            )}
        </div>
        
    </div>
  )
}
