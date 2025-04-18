import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function BlogCard({data}) {
  return (
    <Link href={`/Blogs/${data._id}`}>
        <div className='flex flex-col max-w-[400px] items-center mb-4 my-4 md:my-0 hover:scale-105 max-h-[390px] h-full duration-500 shadow-xl rounded-lg'>

            <div className='relative'>
                <div className='bg-black/30 absolute w-full h-full rounded-t-lg'/>
                <div className='absolute w-full h-full flex flex-col'>
                    <div className='absolute w-full flex flex-row  justify-between bottom-0'>
                        <p className='absolute bottom-2 left-5 text-white'>{data?.reading_time} read</p>
                    </div>
                </div>
                <Image src={data.picture} alt='Service Card Image' width={442} height={223} className='max-h-[200px] h-full object-cover rounded-t-lg'/>
            </div>
            <div className='flex flex-col items-start p-2 my-4'>
                <p className='text-lg m font-semibold text-start w-full'>{data?.title}</p>
                <p className='text-sm'>
                    {data?.description}
                </p>
            </div>
        </div>
    </Link>
  )
}
