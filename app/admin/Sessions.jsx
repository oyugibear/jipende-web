import BookingCard from '@/components/Pages/Admin/BookingCard'
import React from 'react'

export default function Sessions({bookings}) {
  console.log(bookings)
  return (
    <div className='flex flex-col items-center w-full py-12'>
      <h2 className='italic text-lg'>Upcoming Sessions</h2>

      <div className='flex flex-row items-center gap-4 mt-6'>
        <div className='flex flex-col cursor-pointer hover:scale-105 justify-center items-center'>
          <p>Online</p>
          <hr className='border border-yellow-500 w-[30px]' />
        </div>
        <div className='flex flex-col cursor-pointer hover:scale-105 justify-center items-center'>
          <p>In Person</p>
          <hr className='border border-yellow-500 w-[30px]' />
        </div>
      </div>
      <div className='flex flex-col items-center mt-8 w-full gap-4 max-w-[1240px]'>
        {bookings?.data?.map((booking) => (
          <BookingCard key={booking._id} booking={booking}/>
        ))}
      </div>
    </div>
  )
}
