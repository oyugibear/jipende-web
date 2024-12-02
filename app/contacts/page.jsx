'use client'

import Image from 'next/image'
import React from 'react'
import { MdOutlineEmail, MdOutlinePhoneLocked } from 'react-icons/md'

export default function page() {
  return (
    <div className='w-full h-full relative'>
        <div className='absolute flex flex-col items-start md:items-center justify-center w-full h-full z-10 font-medium text-white px-4'>
          <h1 className='text-3xl md:text-5xl text-start'>Contact Us </h1>
          <p className='text-start max-w-[600px] mt-2 font-medium'>
            Contact Us Directly For More Information We&apos;ll Get Back To You ASAP
          </p>
          <div className='my-4 flex flex-col gap-4 text-lg md:flex-row items-start'>
            <div className='flex flex-wrap items-center'>
                <MdOutlinePhoneLocked size={20} className='mr-2'/>
                <p > +254 745601992 || +254 735432045</p>
            </div>
            <div className='flex flex-wrap items-center'>
                <MdOutlineEmail size={20} className='mr-2'/>
                <p > info@africajipendewellness.com</p>
            </div>
          </div>
            <div className='flex flex-col items-start md:items-center'>
                <p>Opening Hours</p>
                <p > Monday – Friday: 9:00am – 6:00pm</p>
                <p > Saturday: 8:00am – 1:00pm</p>
            </div>
          
        </div>
        <div className='absolute w-full h-full bg-black/60' />
        <Image src='/assets/contacts/contact.png' alt='happy person' width={1920} height={568} className='h-[800px] max-h-[800px] xl:max-h-[1000px] object-cover object-center'/>
    </div>
  )
}
