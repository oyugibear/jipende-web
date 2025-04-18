import AboutText from '@/components/Pages/About/AboutText'
import AboutVideos from '@/components/Pages/About/AboutVideos'
import PictureHero from '@/components/Constants/PictureHero'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
        <PictureHero title='Our Story' description='' imgPath='/assets/about/rubie.jpg' />
        <div className='flex max-w-[1440px] w-full p-4 my-12 flex-col items-center gap-6'>
            <AboutText />
            <AboutVideos />
        </div>
    </div>
  )
}
