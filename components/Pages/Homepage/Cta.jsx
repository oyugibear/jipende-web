import React from 'react'

export default function Cta() {
  return (
    <div className='w-full py-12 my-12 bg-gradient-to-br from-[#FFD02A] to-[#FFF395] flex items-center justify-center'>
        <div className='max-w-[1440px] w-full flex flex-wrap gap-4 justify-evenly px-4'>
            <div className='flex flex-col text-center md:text-start my-2 md:my-0'>
                <h3 className='text-xl font-semibold'>Don&apos;t Miss Out On The Latest</h3>
                <p className='text-sm my-2'>
                    Be Among the First to Know: Join Our Newsletter and Stay in the Loop for the Latest News, <br className='hidden md:block'/> Updates, and Insights!
                </p>
            </div>

            <div className='flex flex-col md:flex-row items-center'>
                <input type="text" placeholder='arthur@fasinii.com' className='bg-white px-4 py-2 text-gray-500 rounded-lg'/>
                <button className='bg-white text-black py-2 px-6 rounded-xl font-light mt-4 md:mt-0 md:ml-4'>
                    Subscribe
                </button>
            </div>
        </div>
    </div>
  )
}
