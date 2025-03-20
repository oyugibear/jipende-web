import SimpleTable from '@/components/Constants/tables/SimpleTable'
import BookingCard from '@/components/Pages/Admin/BookingCard'
import Link from 'next/link'
import React from 'react'

export default function Sessions({bookings}) {

  const columns = [
    {
      title: 'Client',
      dataIndex: 'postedBy',
      key: 'postedBy',
      render: (postedBy) => (
        <p>{postedBy?.first_name} {postedBy?.second_name}</p>
      )
    },
    {
      title: 'Date',
      dataIndex: 'services',
      key: 'services',
      render: (services) => (
        <p>{services[0]?.date}</p>
      )
    },
    {
      title: 'Location',
      dataIndex: 'services',
      key: 'services',
      render: (services) => (
        <p>{services[0]?.location}</p>
      )
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentInfo',
      key: 'paymentInfo',
      render: (paymentInfo) => (
        <p>{paymentInfo?.payment_status}</p>
      )
    },
    {
      title: 'Booking Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (text ? text : 'Pending'),
    },
    {
      title: 'Action',
      key: 'action',
      render: ( record) => (
        <Link href={`/admin/bookings/${record?._id}`}>
          View
        </Link>
      ) 
    }
  ]

  return (
    <div className='flex flex-col items-center w-full py-12'>
      <h2 className='italic text-lg'>Bookings List</h2>

      <div className='flex flex-col items-center mt-8 w-full gap-4 max-w-[1240px]'>
        <SimpleTable data={bookings.data} columns={columns} scroll={{ x: 1000 }}/>
      </div>
    </div>
  )
}
