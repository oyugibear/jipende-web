import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PiArrowRight } from 'react-icons/pi'

export default function Card() {
  return (
    <Link href='/Blogs'>
      <div className='relative max-w-[369px] shadow-lg hover:scale-105 duration-500 rounded-lg'>
        <div className='absolute bg-gradient-to-tr from-black/30 to-yellow-100/20 w-full h-full rounded-xl border-2 border-yellow-400'/>
        <div className='absolute flex flex-row items-center bottom-5 left-5'>
            <p className='text-white text-sm'>
              Feeling down, wanna to talk <br /> about it to professional and <br /> experienced  therapists 
            </p>
            <PiArrowRight size={25} className='text-yellow-500 pl-2'/>
        </div>
        <Image src='/assets/homepage/blogCardImgs/blogcard.png' width={369} height={356} alt='blog pic' className='rounded-xl'/>
      </div>
    </Link>
  )
}
