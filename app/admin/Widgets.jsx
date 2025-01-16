'use client'
import React from 'react'
import { BsCoin, BsGraphUp, BsPeople, BsTypeH3 } from 'react-icons/bs'

export default function Widgets({users, services, bookings, payments}) {

    let total = payments?.data?.reduce((acc, payment) => acc + payment.total, 0);
    console.log(total);
  return (
    <div className='flex flex-wrap items-center gap-4 w-full justify-evenly my-12'>
        <div className='flex w-full flex-col items-start max-w-[300px] bg-yellow-200 border rounded-md py-2 px-4'>
            <div className='flex w-full flex-row items-center justify-between'>
                <p className=''>Users</p>
                <BsPeople size={20} className='text-yellow-600'/>
            </div>

            <p className='text-xl pt-4'>{users?.data?.length}</p>
        </div>
        <div className='flex w-full flex-col items-start max-w-[300px] bg-purple-200 border rounded-md py-2 px-4'>
            <div className='flex w-full flex-row items-center justify-between'>
                <p className=''>Services</p>
                <BsTypeH3 size={20} className='text-purple-600'/>
            </div>

            <p className='text-xl pt-4'>{services?.data?.length}</p>
        </div>
        <div className='flex w-full flex-col items-start max-w-[300px] bg-cyan-200 border rounded-md py-2 px-4'>
            <div className='flex w-full flex-row items-center justify-between'>
                <p className=''>Bookings</p>
                <BsGraphUp size={20} className='text-cyan-600'/>
            </div>

            <p className='text-xl pt-4'>{bookings?.data?.length}</p>
        </div>
        <div className='flex w-full flex-col items-start max-w-[300px] bg-green-200 border rounded-md py-2 px-4'>
            <div className='flex w-full flex-row items-center justify-between'>
                <p className=''>Revenue</p>
                <BsCoin size={20} className='text-green-600'/>
            </div>

            <p className='text-xl pt-4'>{"KSH "}{total} </p>
        </div>
    </div>
  )
}
