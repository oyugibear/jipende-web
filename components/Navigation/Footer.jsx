import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className='w-full mb-12 flex items-center justify-center border-t border-yellow-500 pt-4'>
        <div className='flex flex-col w-full items-center justify-center'>
          <div className='flex flex-col gap-6 my-4 md:my-0 md:flex-row items-center max-w-[600px] w-full justify-evenly'>
            <Link href='/about'>
              <button className=''>About Us</button>
            </Link>
            <Link href='/Blogs'>
              <button className=''>Blogs</button>
            </Link>
            <Link href='/contacts'>
              <button className=''>Contacts</button>
            </Link>
            <Link href='/terms'>
              <button className=''>Terms Of Service</button>
            </Link>
            {/* <button className=''>Join The Team</button> */}
          </div>
          
          <p className='text-sm my-6 '>
            All Rights Reserved © 2024. Africa Jipende Wellness.
          </p>
          
          {/* <div className='flex flex-row items-center gap-6'>
            <button className='text-xs'>Terms</button>
            <button className='text-xs'>Privacy</button>
          </div> */}
        </div>
    </div>
  )
}
