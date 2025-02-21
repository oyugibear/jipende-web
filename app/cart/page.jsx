"use client"

import CartCard from '@/components/Pages/Cart/CartCard'
import Checkout from '@/components/Pages/Cart/Checkout'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { PiTrash } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { replaceCart, reset } from '@/app/GlobalRedux/Features/cart/CartSlice'

export default function page() {
   
  const dispatch = useDispatch()
  const cart = useSelector((state) => state?.cart)

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          dispatch(replaceCart(JSON.parse(savedCart)));
        }
    }
  }, [dispatch]);

  const handleClearCart = (e) => {
    e.preventDefault()
    dispatch(reset());
    localStorage.removeItem('cart');
  }
  console.log("cart", cart)

  return (
    <div className='flex flex-col w-full items-center justify-center py-12 px-4'>
      <div className='max-w-[1440px] w-full flex flex-col items-center justify-center md:items-start md:justify-between'>
        <h1 className='text-3xl md:text-5xl font-bold'>Cart</h1>
        <div className='flex flex-col-reverse w-full md:flex-row items-center md:items-start justify-center md:justify-between my-8 gap-4'>
          {/* Cards */}
          <div className='flex flex-col w-full'>
            {cart?.products.map((product) => (
              <CartCard key={product._id} data={product} />
            ))}
            <div className='flex items-end justify-end '>
              <button onClick={(e) => handleClearCart(e)} className='px-4 py-2 rounded-lg bg-yellow-400 mt-4 text-xs'>
                Clear Cart
              </button>
            </div>
          </div>

          <div className='border-l p-4 h-full hidden md:block'/>

          {/* Checkout */}
          <Checkout cart={cart}/>
        </div>
      </div>
    </div>
  )
}
