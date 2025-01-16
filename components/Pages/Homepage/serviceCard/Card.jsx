import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PiArrowRightThin } from 'react-icons/pi'

export default function Card({id, title, description, image}) {
  return (
    <Link href='/services'>
      <div className="flex flex-row items-center justify-between border shadow-xl rounded-lg pb-4 hover:scale-105 duration-500 cursor-pointer">
          <div className="flex flex-col w-full max-w-[400px] md:max-w-[300px]">
            <Image src={image} alt='Service Card Pic' className='rounded-t-lg h-[223px] object-cover object-top ' width={442} height={223}/>
            <div className='flex flex-col p-2'>
              <div className="my-4 flex flex-row items-center">
                  <p className="font-semibold pr-4">{title}</p>
                  <PiArrowRightThin size={20}/>
              </div>
              <p>
              {description}
              </p>
            </div>
          </div>
      </div>
    </Link>
  )
}
