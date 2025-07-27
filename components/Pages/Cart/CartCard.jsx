'use client'

import { removeProductFromCart } from '@/app/GlobalRedux/Features/cart/CartSlice'
import Image from 'next/image'
import React, { useState } from 'react'
import { PiTrash, PiClock, PiCalendar } from 'react-icons/pi'
import { useDispatch } from 'react-redux'
import { Modal, message } from 'antd'

export default function CartCard({data}) {
  const [removing, setRemoving] = useState(false)
  const dispatch = useDispatch();

  const handleRemove = () => {
    Modal.confirm({
      title: 'Remove Item',
      content: `Are you sure you want to remove "${data?.title}" from your cart?`,
      okText: 'Yes, Remove',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk: () => {
        setRemoving(true)
        setTimeout(() => {
          dispatch(removeProductFromCart({ id: data?._id }))
          message.success('Item removed from cart')
          setRemoving(false)
        }, 300)
      }
    });
  }

  return (
    <div className={`w-full transition-all duration-300 ${removing ? 'opacity-50 transform scale-95' : 'opacity-100'}`}>
      <div className='flex flex-row justify-between items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200'>
        {/* Service Image */}
        <div className='flex-shrink-0'>
          <div className='relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden shadow-sm'>
            <Image 
              src={data?.picture || '/assets/cart/cartPic.png'} 
              alt={data?.title || 'Service image'} 
              fill
              className='object-cover'
            />
          </div>
        </div>

        {/* Service Details */}
        <div className='flex-1 min-w-0'>
          <h3 className='font-semibold text-lg text-gray-900 mb-2 truncate'>
            {data?.title}
          </h3>
          
          {/* Date and Time */}
          <div className='space-y-1 mb-3'>
            {data?.date && (
              <div className='flex items-center gap-2 text-sm text-gray-600'>
                <PiCalendar size={16} className='text-yellow-500' />
                <span className='font-medium text-yellow-600'>Date:</span>
                <span>{data?.date}</span>
              </div>
            )}
            {data?.time && (
              <div className='flex items-center gap-2 text-sm text-gray-600'>
                <PiClock size={16} className='text-yellow-500' />
                <span className='font-medium text-yellow-600'>Time:</span>
                <span>{data?.time}</span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className='flex items-center justify-between'>
            <p className='text-xl font-bold text-gray-900'>
              KSH {data?.price?.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          disabled={removing}
          className='flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50'
          title="Remove from cart"
        >
          <PiTrash size={20} />
        </button>
      </div>
    </div>
  )
}
