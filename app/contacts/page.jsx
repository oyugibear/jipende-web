'use client'

import BasicInputs from '@/components/Constants/fields/BasicInputs'
import BasicTextArea from '@/components/Constants/fields/BasicTextArea'
import PictureHero from '@/components/Constants/PictureHero'
import BasicQuery from '@/components/Constants/Queries/BasicQuery'
import { Basic } from 'next/font/google'
import Image from 'next/image'
import React from 'react'
import { MdOutlineAccessTime, MdOutlineEmail, MdOutlinePhoneLocked } from 'react-icons/md'

export default function page() {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <PictureHero title='Contact Us' description="" imgPath='/assets/contacts/c4.jpg' />
      <div className='bg-yellow-400 w-full py-2'>
        <div className='max-w-[1440px] w-full flex flex-wrap items-start justify-center p-4 gap-6'>
          <div className='min-w-[280px] flex flex-col justify-center gap-2 items-center'>
            <MdOutlinePhoneLocked size={20} />
            <p className='font-bold'> +254 745601992 <br /> +254 735432045</p>
          </div>
          <div className='min-w-[280px] flex flex-col justify-center gap-2 items-center text-center'>
            <MdOutlineAccessTime size={20} />
            <p className='font-bold'> Monday – Friday: <br /> 9:00am – 6:00pm</p>
            <p className='font-bold'> Saturday: <br /> 8:00am – 1:00pm</p>
          </div>
          <div className='min-w-[280px] flex flex-col justify-center gap-2 items-center'>
            <MdOutlineEmail size={20} />
            <p className='font-bold'> info@africajipendewellness.com</p>
          </div>
        </div>
      </div>

      <BasicQuery />
    </div>
  )
}
