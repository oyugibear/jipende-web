import React from 'react'
import Card from '../Services/ServiceCard/Card'

export default function RelatedServices() {
  return (
    <div className='w-full flex items-center justify-center'>
        <div className='max-w-[1440px]  py-12  w-full flex flex-col px-4'>
            <h2 className='text-xl font-semibold'>Related Therapy Sessions</h2>
            <div className='flex flex-col md:flex-row items-center justify-between w-full mt-8 gap-4'>
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    </div>
  )
}
