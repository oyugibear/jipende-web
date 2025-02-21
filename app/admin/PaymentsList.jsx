'use client'

import SimpleTable from '@/components/Constants/tables/SimpleTable'
import Link from 'next/link'
import React from 'react'

export default function PaymentsList({payments}) {

    const columns = [
        {
            title: 'Client Name',
            dataIndex: 'client_name',
            key: 'client_name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
        },
        {
            title: 'Payment Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Payment Status',
            dataIndex: 'payment_status',
            key: 'payment_status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Link href={`/admin/payments/${record?.action._id}`}>
                    View
                </Link>
            )
        }
    ]

    const fixedData = payments?.data?.map((payment) => {
        return {
            client_name: payment?.postedBy?.first_name + " " + payment?.postedBy?.second_name,
            amount: payment?.final_amount_invoiced,
            currency: payment?.currency,
            date: payment ? payment?.payment_date?.split("T")[0] : '',
            payment_status: payment?.payment_status,
            action: payment
        }
    }) || []
    console.log("payments: ??????", fixedData)
  return (
    <div className='flex flex-col items-center w-full py-12'>
        <h2 className='italic text-lg'>Payments</h2>

        <div className='flex flex-col items-center mt-8 w-full gap-4 max-w-[1240px]'>
        <SimpleTable data={fixedData} columns={columns} scroll={{ x: 1000 }}/>
        </div>
    </div>
  )
}
