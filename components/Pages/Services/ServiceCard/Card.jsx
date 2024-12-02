import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Card({service}) {

    // console.log(service)
  return (
    <Link href={`/services/${service?._id}`}>
        <div className='flex flex-col max-w-[400px] items-center mb-4 my-4 md:my-0'>

            <div className='relative'>
                <div className='bg-black/30 absolute w-full h-full'/>
                <div className='absolute w-full h-full flex flex-col'>
                    <div className='absolute w-full flex flex-row  justify-between bottom-0'>
                        <p className='absolute bottom-2 left-5 text-white'>{service?.duration} min</p>
                        <div className='absolute px-4 py-2 bg-white bottom-0 right-0 lg:w-[40%] flex items-center justify-center'>
                            <p>KSH {service?.price}</p>
                        </div>
                    </div>
                </div>
                <Image src='/assets/services/cardImg.png' alt='Service Card Image' width={442} height={223} className='max-h-[223px] object-cover'/>
            </div>
            <p className='text-lg my-4 font-semibold'>{service?.title}</p>
            <p className='text-sm'>
                {service?.description || service?.description_of_service }
            </p>
        </div>
    </Link>
  )
}
