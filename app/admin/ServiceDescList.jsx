'use client'

import SimpleTable from '@/components/Constants/tables/SimpleTable'
import ServiceModal from '@/components/Pages/Admin/modals/ServiceModal'
import Link from 'next/link'
import React, { useState } from 'react'

export default function ServiceDescList({services, setRefresh}) {

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Image',
            dataIndex: 'imgPath',
            key: 'imgPath',
        },
        {
            title: 'Image Description',
            dataIndex: 'imgAlt',
            key: 'imgAlt',
        },
        {
            title: 'side',
            dataIndex: 'side',
            key: 'side',
        },
        {
            title: 'Benefits',
            dataIndex: 'benefits',
            key: 'benefits',
        },
        {
            title: 'Category',
            dataIndex: 'benefits',
            key: 'benefits',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Link href={`/admin/services/${record?.action._id}`}>
                    View
                </Link>
            )
        }
    ]

    const fixedData = services?.data?.map((item) => {
        return {
            title: item?.title,
            description: item?.description,
            price: item?.price,
            image: item?.picture,
            number_of_attendees: item?.number_of_attendees,
            location: item?.location,
            duration: item?.duration,
            availability: item?.availability,
            category: item?.category,
            action: item
        }
    }) || []


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (type) => {
        setIsModalOpen(true);
    };
  return (
    <div className='flex flex-col items-center w-full py-12'>
        <div className='flex flex-row items-end justify-between w-full max-w-[1240px]'>
            <h2 className='italic text-lg'>Services</h2>
            <button onClick={showModal} className='button text-sm'>
                Add New Service Desc
            </button>
        </div>

        <div className='flex flex-col items-center mt-8 w-full gap-4 max-w-[1240px]'>
        <SimpleTable data={fixedData} columns={columns} scroll={{ x: 1000 }}/>
        </div>
        { isModalOpen && (
            <ServiceModal type='add' setIsOpen={setIsModalOpen} isOpen={isModalOpen} setRefresh={setRefresh}/>
        )}
    </div>
  )
}
