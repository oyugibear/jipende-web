'use client'

import { removeProductFromCart } from '@/app/GlobalRedux/Features/cart/CartSlice'
import Image from 'next/image'
import React from 'react'
import { PiTrash } from 'react-icons/pi'
import { useDispatch } from 'react-redux'

export default function CartCard({data}) {

  // const [dates, setDates] = useState('')
  console.log("Cart Card:%%%%",data)

  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeProductFromCart({ id: data?._id }))
  }

  return (
    <div className='w-full flex flex-col max-w-[800px] '>
        <div className='flex flex-row justify-between py-4 gap-4 my-4'>
            <div className='flex flex-col gap-4 md:flex-row justify-evenly items-start pl-4'>
              <Image src='/assets/cart/cartPic.png' alt='cart card image' width={216} height={145} className='max-w-[100px] object-contain md:w-full' />
              <div className='flex flex-col items-start'>
                <p className='font-medium text-xl'>{data?.title}</p>
                <div className='flex flex-col items-start '>
                  <div className='flex text-sm text-gray-400 flex-row items-center gap-2'>
                    <p className='text-yellow-500 font-bold'>Selected Date</p>
                    <p>{data?.date}</p>
                  </div>
                  <div className='flex text-sm text-gray-400 flex-row items-center gap-2'>
                    <p className='text-yellow-500 font-bold'>Selected time</p>
                    <p>{data?.time}</p>
                  </div>
                </div>
                <p className='text-lg font-light my-2'>KSH {data.price}</p>
              </div>
            </div>
              <PiTrash onClick={handleRemove} size={20}/>
        </div>
        <hr />
    </div>
  )
}
