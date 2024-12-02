import Image from 'next/image'
import React from 'react'


export default function OnlineServiceCard({title, description, date, time}) {
  return (
    <div className='flex flex-col p-4'>
        <div className='flex flex-col py-4 md:flex-row w-full items-center'>
            <Image src='/assets/cart/cartPic.png' alt='service card image' width={216} height={145} className='w-full md:max-w-[180px]'/>
            <div className='w-full my-4 md:pl-4'>
            <p className='text-lg font-medium'>{title}</p>
            <p className=' text-slate-400 mt-2'> {description}</p>
            <p className=' text-slate-400'> {date} {time}</p>
            </div>

            <div className='flex flex-col gap-2 w-full md:w-fit'>
            <button className='flex w-full bg-[#FFD02A] whitespace-nowrap justify-center py-2 px-4'>
                Meeting Link
            </button>
            <button className='flex bg-black text-white whitespace-nowrap justify-center py-2 px-4'>
                Change Location & Time
            </button>
            </div>
        </div>
        <hr />
    </div>
  )
}
