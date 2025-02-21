import Link from 'next/link'
import React from 'react'

export default function BookingCard({booking}) {
  return (
    <div className='w-fit flex flex-wrap items-center border justify-evenly gap-8 rounded-lg p-4'>
      <div className='flex flex-row gap-2'>
        <p className='text-purple-500'> Client: </p>
        <p> {booking.postedBy.first_name} {booking.postedBy.second_name} </p>
      </div>
      <div className='flex flex-row gap-2'>
        <p className='text-purple-500'> Date: </p>
        <p> {booking?.services[0]?.date} </p>
      </div>
      <div className='flex flex-row gap-2'>
        <p className='text-purple-500'> Location: </p>
        <p> {booking?.services[0]?.location} </p>
      </div>
      <div className='flex flex-row gap-2'>
        <p className='text-purple-500'> Payment Staus: </p>
        <p> {booking?.paymentInfo?.payment_status} </p>
      </div>
      <div className='flex flex-row gap-2'>
        <p className='text-purple-500'> Booking Staus: </p>
        <p> Not Complete </p>
      </div>
      <div className='flex flex-row gap-2'>
        <Link href={`/admin/${booking?._id}`}>
          <button className='px-4 py-2 rounded-full bg-green-300 border hover:bg-green-500'>
            View Booking
          </button>
        </Link>
      </div>
    </div>
  )
}
