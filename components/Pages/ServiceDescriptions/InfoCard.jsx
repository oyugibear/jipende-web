'use client'

import Image from 'next/image'
import React from 'react'

export default function InfoCard({ data }) {
  return (
    <div className='w-full py-8'>
      <div className='flex flex-col md:flex-row items-center justify-center gap-6'>

        {data.side === 'left' && (
          <div className="flex-1">
            <Image
              src={data.imgPath}
              alt={data.imgAlt}
              width={500}
              height={500}
              className='w-full max-w-full object-cover rounded-lg shadow-lg max-h-[400px]'
            />
          </div>
        )}

        {/* Text Section */}
        <div className='flex-1 flex flex-col items-start justify-center gap-2 max-w-full'>
          <p className='text-2xl font-semibold'>{data.title}</p>
          <p className='text-sm italic'>{data.subTitle}</p>
          <p className='text-sm font-light'>{data.description}</p>

          {data.benefits && data.benefits.length > 0 && (
            <>
              <p className='text-sm font-semibold'>Benefits:</p>
              {data.benefits.map((item, index) => (
                <p key={index} className='text-sm font-light'>{item}</p>
              ))}
            </>
          )}
        </div>

        {data.side === 'right' && (
          <div className="flex-1">
            <Image
              src={data.imgPath}
              alt={data.imgAlt}
              width={500}
              height={500}
              className='w-full max-w-full object-cover rounded-lg shadow-lg max-h-[400px]'
            />
          </div>
        )}

      </div>
    </div>
  )
}
