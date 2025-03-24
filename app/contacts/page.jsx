'use client'

import BasicInputs from '@/components/Constants/fields/BasicInputs'
import BasicTextArea from '@/components/Constants/fields/BasicTextArea'
import BasicQuery from '@/components/Constants/Queries/BasicQuery'
import { Basic } from 'next/font/google'
import Image from 'next/image'
import React from 'react'
import { MdOutlineAccessTime, MdOutlineEmail, MdOutlinePhoneLocked } from 'react-icons/md'

export default function page() {
  return (
    <div className='flex flex-col w-full'>
      <div className='w-full h-full relative'>
          <div className='absolute flex flex-col items-center justify-center w-full h-full z-10 font-medium text-white px-4'>
            <h1 className='text-3xl md:text-5xl text-start'>Contact Us </h1>
            <p className='text-center max-w-[600px] mt-2 font-medium'>
              Contact Us Directly For More Information We&apos;ll Get Back To You ASAP
            </p>
            <div className='my-4 flex flex-col gap-8 md:my-4 text-lg text-center md:flex-row md:items-start justify-center md:justify-between'>
              <div className='flex flex-col justify-center gap-2 items-center'>
                  <MdOutlinePhoneLocked size={40} />
                  <p > +254 745601992 || +254 735432045</p>
              </div>
              <div className='flex flex-col justify-center gap-2 items-center'>
                  <MdOutlineEmail size={40} />
                  <p > info@africajipendewellness.com</p>
              </div>
              <div className='flex flex-col justify-center gap-2 items-center'>
                  <MdOutlineAccessTime size={40} />
                  <p > Monday – Friday: 9:00am – 6:00pm</p>
                  <p > Saturday: 8:00am – 1:00pm</p>
              </div>
            </div>
            
          </div>
          <div className='absolute w-full h-full bg-black/60' />
          <Image src='/assets/contacts/contact2.png' alt='happy person' width={1920} height={568} className='h-[800px] max-h-[800px] xl:max-h-[1000px] object-cover object-center w-full'/>
      </div>

      <BasicQuery />
    </div>
  )
}
