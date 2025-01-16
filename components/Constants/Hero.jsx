import React from 'react'

export default function Hero({ title, description }) {
  return (
    <div className='w-full h-full py-24 flex items-center justify-center bg-gradient-to-br from-[#FFD02A] to-[#FFF395] px-4'>
        <div className='flex flex-col text-center'>
            <h1 className='text-3xl md:text-5xl font-bold mb-2'>{title}</h1>
            <p className='text-light'>{description}</p>
        </div>
    </div>
  )
}
