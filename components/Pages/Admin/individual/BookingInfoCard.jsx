import { Descriptions } from 'antd'
import React from 'react'

export default function BookingInfoCard({booking}) {
  console.log("booking", booking)

  const items = [
    {
      key: '1',
      label: 'Client Name',
      children: `${booking?.postedBy?.first_name} ${booking?.postedBy?.second_name}`
    },
    {
      key: '2',
      label: 'Client Email',
      children: booking?.postedBy?.email
    },
    {
      key: '3',
      label: 'Date Selected',
      children: booking?.services[0].date
    },
    {
      key: '4',
      label: 'Time Selected',
      children: booking?.services[0].time
    },
    {
      key: '5',
      label: 'Location',
      children: booking?.services[0].location
    },
    {
      key: '6',
      label: 'Payment Status',
      children: booking?.paymentStatus == true ? 'Paid' : 'Not Paid'
    },
    {
      key: '7',
      label: 'Booking Status',
      children: booking?.status
    },
    {
      key: '8',
      label: 'Google Meet Link',
      children: booking?.status == 'link added' ? booking?.googleMeetLink : booking?.reschedule
    }
  ]
  return (
    <div className='my-4'>
      <Descriptions bordered items={items} />
    </div>
  )
}
