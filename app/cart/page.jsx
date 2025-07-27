"use client"

import CartCard from '@/components/Pages/Cart/CartCard'
import Checkout from '@/components/Pages/Cart/Checkout'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { PiTrash, PiShoppingCartSimple, PiArrowLeft } from 'react-icons/pi'
import { FiShoppingBag } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { replaceCart, reset } from '@/app/GlobalRedux/Features/cart/CartSlice'
import { useRouter } from 'next/navigation'
import { Modal } from 'antd'

export default function CartPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state?.cart)
  const [loading, setLoading] = useState(true)
  const [clearingCart, setClearingCart] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          dispatch(replaceCart(JSON.parse(savedCart)));
        }
        setLoading(false)
    }
  }, [dispatch]);

  const handleClearCart = () => {
    Modal.confirm({
      title: 'Clear Cart',
      content: 'Are you sure you want to remove all items from your cart?',
      okText: 'Yes, Clear Cart',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk: () => {
        setClearingCart(true)
        setTimeout(() => {
          dispatch(reset());
          localStorage.removeItem('cart');
          setClearingCart(false)
        }, 500)
      }
    });
  }

  const handleContinueShopping = () => {
    router.push('/services')
  }

  const cartItemCount = cart?.products?.length || 0
  const isEmpty = cartItemCount === 0

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full items-center justify-start py-8 px-4 min-h-screen bg-gray-50'>
      <div className='max-w-[1440px] w-full flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center gap-4'>
            <button 
              onClick={handleContinueShopping}
              className='flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors duration-200'
            >
              <PiArrowLeft size={20} />
              <span className='text-sm'>Continue Shopping</span>
            </button>
          </div>
          <div className='flex items-center gap-2'>
            <PiShoppingCartSimple size={24} className='text-yellow-600' />
            <h1 className='text-sm font-bold text-gray-900'>
              Shopping Cart
            </h1>
            {!isEmpty && (
              <span className='bg-yellow-500 text-white text-xs px-2 py-1 rounded-full ml-2'>
                {cartItemCount}
              </span>
            )}
          </div>
        </div>

        {/* Empty Cart State */}
        {isEmpty ? (
          <div className='flex flex-col items-center justify-center py-16 text-center'>
            <div className='bg-white rounded-full p-8 shadow-lg mb-6'>
              <FiShoppingBag size={64} className='text-gray-300' />
            </div>
            <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
              Your cart is empty
            </h2>
            <p className='text-gray-600 mb-8 max-w-md'>
              Looks like you haven't added any services to your cart yet. 
              Discover our amazing wellness services and start your journey.
            </p>
            <button
              onClick={handleContinueShopping}
              className='bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2'
            >
              <FiShoppingBag size={20} />
              Browse Services
            </button>
          </div>
        ) : (
          <>
            {/* Cart Content */}
            <div className='flex flex-col-reverse w-full lg:flex-row items-start justify-between gap-8'>
              {/* Cart Items */}
              <div className='flex flex-col w-full lg:w-2/3'>
                <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      Items in your cart ({cartItemCount})
                    </h3>
                    {cartItemCount > 0 && (
                      <button
                        onClick={handleClearCart}
                        disabled={clearingCart}
                        className='flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors duration-200 disabled:opacity-50'
                      >
                        <PiTrash size={16} />
                        <span className='text-sm'>
                          {clearingCart ? 'Clearing...' : 'Clear Cart'}
                        </span>
                      </button>
                    )}
                  </div>
                  
                  <div className='space-y-4'>
                    {cart?.products.map((product, index) => (
                      <div key={`${product._id}-${index}`} className='border-b border-gray-100 last:border-b-0 pb-4 last:pb-0'>
                        <CartCard data={product} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Continue Shopping Button */}
                <button
                  onClick={handleContinueShopping}
                  className='bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 text-xs gap-2 rounded-lg font-medium transition-colors duration-200 self-start'
                >
                  ← Continue Shopping
                </button>
              </div>

              {/* Checkout Section */}
              <div className='w-full lg:w-1/3'>
                <div className='bg-white rounded-lg shadow-sm sticky top-4'>
                  <Checkout cart={cart}/>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
