import React from 'react'

export default function BookingInfoCard({booking}) {
  console.log("booking", booking)
  return (
    <div className='flex flex-wrap items-center justify-evenly gap-4 my-8 py-4 bg-slate-100 border rounded-md px-4'>
        <div className='flex flex-row gap-2'>
        <p className='text-purple-500'> Client Name: </p>
        <p> {booking?.postedBy?.first_name}{" "}{booking?.postedBy?.second_name}  </p>
        </div>
        <div className='flex flex-row gap-2'>
        <p className='text-purple-500'> Client Email: </p>
        <p> {booking?.postedBy?.email} </p>
        </div>
        <div className='flex flex-row gap-2'>
        <p className='text-purple-500'> Date Selected: </p>
        <p> {booking?.services[0].date} </p>
        </div>
        <div className='flex flex-row gap-2'>
        <p className='text-purple-500'> Time Selected: </p>
        <p> {booking?.services[0].time} </p>
        </div>
        <div className='flex flex-row gap-2'>
        <p className='text-purple-500'> Location: </p>
        <p> {booking?.services[0].location} </p>
        </div>
        <div className='flex flex-row gap-2'>
        <p className='text-purple-500'> Payment Status: </p>
        <p> {booking?.paymentStatus == true ? 'Paid' : 'Not Paid'} </p>
        </div>
        <div className='flex flex-row gap-2'>
        <p className='text-purple-500'> Bookig Status: </p>
        <p> {booking?.status} </p>
        </div>
        <div className='flex flex-row gap-2'>
        <p className='text-purple-500'> Google Meet Link: </p>
        <p> {booking?.status == 'link added' ? booking?.googleMeetLink : booking?.rescheduleLink} </p>
        </div>
        
    </div>
  )
}
