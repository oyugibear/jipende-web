'use client'

import SimpleTable from '@/components/Constants/tables/SimpleTable'
import Link from 'next/link'
import React from 'react'

export default function UserList({users}) {

    const columns = [
        {
            title: 'Client Name',
            dataIndex: 'client_name',
            key: 'client_name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Link href={`/admin/users/${record?.action?._id}`}>
                    View
                </Link>
            )
        }
    ]

    const userData = users?.data?.map((user) => {
        return {
            client_name: user?.first_name + " " + user?.second_name,
            email: user?.email,
            phone_number: user?.phone_number,
            role: user?.role,
            action: user
        }
    }) || []

    console.log("users: ??????", userData)


  return (
    <div className='flex flex-col items-center w-full py-12'>
      <h2 className='italic text-lg'>List of users</h2>

      <div className='flex flex-col items-center mt-8 w-full gap-4 max-w-[1240px]'>
        <SimpleTable data={userData} columns={columns} scroll={{ x: 1000 }}/>
      </div>
    </div>
  )
}
