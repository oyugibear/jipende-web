import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


export default function Slider() {
  return (
    <div className='w-full h-full relative'>
        <div className='absolute flex flex-col items-end justify-center w-full h-full z-10 pt-12 font-medium text-white px-4'>
          <div className='max-w-[600px]'>
            <h1 className='text-3xl md:text-5xl text-start'>Welcome To Jipende Wellness</h1>
            <p className='text-start max-w-[600px] mt-2 text-lg font-extralight'>
              A holistic mental wellness organisation that demystifies mental health
              in Africa through therapy 
            </p>
            <Link href='/services'>
              <button className='px-4 py-2 bg-yellow-500 rounded-lg uppercase text-black text-sm font-bold my-4'>
                Book a Session
              </button>
            </Link>
          </div>
          {/* <button className='px-4 py-2 text-white text-sm font-light underline'>
            View servcies
          </button> */}
        </div>
        <div className='absolute w-full h-full bg-black/40' />
        <Image src='/assets/homepage/homebg.jpg' alt='happy person' width={1920} height={568} className='h-[800px] max-h-[568px] xl:max-h-[1000px] object-cover object-top'/>
    </div>
  )
}
