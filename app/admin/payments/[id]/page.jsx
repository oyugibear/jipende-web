'use client'

import { API_URL } from '@/config/api.config'
import { Descriptions } from 'antd'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

async function getPayment(id){
    const res = await axios.get(`${API_URL}/payment/${id}`)
    return res.data
}

export default function page({}) {

    const [payment, setPayment] = useState(null)
    const { id } = useParams();
  
    const getData = async () => {
      const data = await getPayment(id) || null
      setPayment(data.data)
    }
  
    useEffect(() => {
      getData()
    }, [])

    console.log(payment)

    const items = [
        {
            key: '1',
            label: 'Client Name',
            children: `${payment?.postedBy?.first_name} ${payment?.postedBy?.second_name}`
        },
        {
            key: '2',
            label: 'Client Email',
            children: payment?.postedBy?.email
        },
        {
            key: '3',
            label: 'Amount',
            children: payment?.final_amount_invoiced
        },
        {
            key: '4',
            label: 'VAT (KSH)',
            children: payment?.vat
        },
        {
            key: '5',
            label: 'Currency',
            children: payment?.currency
        },
        {
            key: '6',
            label: 'Payment Type',
            children: payment?.payment_method
        },
        {
            key: '7',
            label: 'Payment Gateway',
            children: payment?.paymentType
        },
        {
            key: '7',
            label: 'Payment Date',
            children: payment?.payment_date ? payment.payment_date.split("T")[0] : ''
        },
        {
            key: '6',
            label: 'Payment Status',
            children: payment?.payment_status
        },
        {
            key: '6',
            label: 'Booking ID',
            children: payment?.booking_id?._id
        },
        {
            key: '6',
            label: 'Payment ID',
            children: payment?._id
        },

    ]

    return (
        <div className='flex flex-col w-full items-center justify-center py-12 p-4'>
            <div className='max-w-[1440px] w-full flex flex-col'>
                <h1 className='text-xl font-medium'>Payment Information</h1>
                <p>Below are are all the details concerning this payment</p>
                <div className='my-6'>
                    <Descriptions bordered items={items} />
                </div>
            </div>
        </div>
    )
}
