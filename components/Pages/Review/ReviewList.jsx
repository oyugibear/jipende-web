import React from 'react'
import Card from './ReviewCard/Card'

export default function ReviewList() {
  return (
    <div className='my-12 py-12 bg-[#F8F8F8] w-full flex flex-col items-center justify-center'>
        <div className='flex flex-col w-full max-w-[1440px] px-4 '>
            <h2 className='text-xl font-semibold'>Reviews</h2>
            <div className='flex flex-col  md:flex-row gap-4 items-center justify-evenly'>
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    </div>
  )
}
