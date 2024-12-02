import Image from 'next/image'
import React from 'react'

export default function PictureHero({title, description, imgPath}) {
  return (
    <div className='w-full h-full relative'>
        <div className='absolute flex flex-col items-center justify-center w-full h-full z-10 font-medium text-white px-4'>
          <h1 className='text-3xl md:text-5xl text-start'>{title}</h1>
          <p className='text-start max-w-[600px] mt-2 font-extralight'>
          {description} 
          </p>
        </div>
        <div className='absolute w-full h-full bg-black/40' />
        <Image src={imgPath} alt='happy person' width={1920} height={568} className='h-[400px] max-h-[568px] xl:max-h-[600px] object-cover object-center'/>
    </div>
  )
}
