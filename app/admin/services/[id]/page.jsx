'use client'

import ServiceModal from '@/components/Pages/Admin/modals/ServiceModal'
import { API_URL } from '@/config/api.config'
import { Descriptions, Image, Modal } from 'antd'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

async function getServices(id){
    const res = await axios.get(`${API_URL}/service/${id}`)
    return res.data
}

export default function page({}) {

    const [service, setService] = useState(null)
    const { id } = useParams();
    const [refresh, setRefresh] = useState(false)

    const getData = async () => {
      const data = await getServices(id) || null
      setService(data)
    }
  
    useEffect(() => {
      getData()
    }, [refresh])

    console.log("service", service)

    const items = [
        {
            key: '1',
            label: 'Title',
            children: service?.title
        },
        {
            key: '2',
            label: 'Price',
            children: service?.price
        },
        {
            key: '3',
            label: 'Number of Attendees',
            children: service?.number_of_attendees
        },
        {
            key: '4',
            label: 'Location',
            children: service?.location
        },
        {
            key: '5',
            label: 'Duration',
            children: service?.duration
        },
        {
            key: '6',
            label: 'category',
            children: service?.category
        },
        {
            key: '7',
            label: 'Availability',
            children: service?.availability
        },
        {
            key: '7',
            label: 'Description',
            children: service?.description
        },

    ]

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='flex flex-col w-full items-center justify-center py-12 p-4'>
            <div className='max-w-[1440px] w-full flex flex-col'>
                <h1 className='text-xl font-medium'>Service Information</h1>
                <p>Below are are all the details concerning this service</p>
                <div className='my-6 w-full'>
                    {/* <Image src={service?.picture} alt='service image' width={216} height={145} className='w-full md:max-w-[180px]'/> */}
                    <div className='w-full flex flex-row items-end justify-between my-4'>
                        <Image src={service?.picture}  alt='service image' className='w-full aspect-auto max-w-sm'/>
                        <button  onClick={showModal} className='button hover:bg-yellow-300 text-sm font-bold'>
                            Edit
                        </button>
                    </div>
                    <Descriptions bordered items={items} />
                </div>
            </div>
            <ServiceModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} type='edit' serviceDetails={service} setRefresh={setRefresh}/>
        </div>
    )
}
