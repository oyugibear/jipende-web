"use client"

import React, { useState } from 'react'
import CheckoutLabel from './CheckoutLabel'
import axios from 'axios'
import { API_URL } from '@/config/api.config'
import { message } from 'antd'
import { useUser } from '@/context'
import { reset } from '@/app/GlobalRedux/Features/cart/CartSlice'; 
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Checkout({cart}) {

    // console.log(cart)

    let tax = cart.totalAmount * 0.16
    const { user } = useUser()

    const router = useRouter()
    const dispatch = useDispatch()

    const handleClick = async (e) => {
        e.preventDefault();
        
        try {
            const { data } = await axios.post(`${API_URL}/booking/add`, {
                services: cart.products,
                final_amount: cart.totalAmount,
                vat: tax,
                postedBy: user._id,
                user: user
            })
            if (data) {
                message.success("Kindly pay for your order to proceed");
                dispatch(reset());
                
                console.log("Payment link", data.paymentLink)
                if (data.data.paymentLink) {
                    window.location.href = data.data.paymentLink; // Open the payment link in a new tab
                } else {
                  message.error("Payment link is not available");
                }
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
            {!user ? (
                <Link href='/auth/signin'>
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
