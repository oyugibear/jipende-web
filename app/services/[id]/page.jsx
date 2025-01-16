'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IoMdPeople } from 'react-icons/io'
import { PiClockFill } from 'react-icons/pi'
import { FiShoppingCart } from 'react-icons/fi'
import ReviewList from '@/components/Pages/Review/ReviewList'
import Card from '@/components/Pages/Services/ServiceCard/Card'
import RelatedServices from '@/components/Pages/RelatedServices/RelatedServices'
import axios from 'axios'
import { API_URL } from '@/config/api.config'
import { useDispatch } from 'react-redux'
import { addProduct } from '@/app/GlobalRedux/Features/cart/CartSlice'
import { Modal, message } from 'antd'


async function getService(productId) {
    const { data } = await axios.get(`${API_URL}/service/${productId}`)
    return data
  }

export default function page({
    params
})  {
    console.log("params",params)

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [data, setData] = useState({})
    const fetcher = async () => {
        const dt = await getService(params.id)
        setData(dt)
    } 

    useEffect(() => {
        fetcher()
    }, [])

    console.log("data", data)

    const dispatch = useDispatch()

    let price = data?.price
    const [quantity, setQuantity] = useState(1)

    const handleClick = () => {
        try {
            dispatch(addProduct({product: data, date: date, time: time, quantity: quantity, price: price }))
            message.success('Your Order Has Been Placed')
            setIsModalOpen(false);
        } catch (error) {
            console.log(error)
            message.error('Your Order Has Not Been Placed')
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
        <div className='flex flex-col w-full items-center justify-center mx-4 md:mx-0'>
            <div className='flex flex-col w-full max-w-[1440px] md:my-12 py-12 text-sm md:text-base md:px-4'>
                <div className='flex flex-col mx-4 md:mx-0'>
                    <h1 className='text-xl md:text-3xl mb-2 font-medium md:font-normal'>{data?.category}</h1>
                    <p>Out and about building new relationships with our toxic pasts.</p>
                </div>

                <div className='flex flex-col md:flex-row items-center justify-evenly mt-8 p-4'>
                    <div className=''>
                        <Image src='/assets/Product/productImg.png' alt='product Image' width={647} height={390} className='' />
                    </div>

                    <div className='flex flex-col mx-4 w-full'>
                        <h2 className='text-xl font-bold mt-6 md:mt-0'>{data.title}</h2>
                        <p className='w-full max-w-[700px] my-4'>
                            {data?.description}
                        </p>
                        <div className='flex flex-row items-center mb-4'>
                            <div className='flex flex-row items-center'>
                                <PiClockFill size={25} className='text-yellow-500'/>
                                <p className='text-sm pl-2'>{data?.duration} Minuites</p>
                            </div>
                            <div className='flex flex-row items-center pl-6'>
                                <IoMdPeople size={25} className='text-yellow-500'/>
                                <p className='text-sm pl-2'>{data?.number_of_attendees} people</p>
                            </div>
                        </div>

                        <p className='text-lg my-6'>KSH {data?.price}</p>

                        <div className='flex flex-col  md:flex-row items-center'>
                            <button  onClick={showModal} className='px-6 py-2 bg-[#FFD02A] w-full justify-center md:w-fit my-4 text-black flex items-center gap-4 text-sm font-light'>
                                <FiShoppingCart />
                                Add To Cart
                            </button>
                            {/* <div className='pl-4'>
                                <p className='text-sm'>View available dates</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            <ReviewList />
            <RelatedServices />

            <Modal open={isModalOpen} onCancel={handleCancel} footer={[<button onClick={handleClick}  className={`bg-yellow-500 text-white font-bold rounded-lg py-2 px-4 ${!date && 'bg-gray-400 cursor-default'}`}> Submit </button>]} >
                <div className='flex flex-col items-center my-4 py-8'>
                    <p className='text-lg font-bold '>Select Session Date & Time</p>
                    <p className='text-sm text-center'>Please select the date and time you would like to attend this session</p>
                    
                    
                    <div className='flex flex-col md:flex-row items-center gap-4 my-4'>
                        <div className='flex flex-col items-start w-full'>
                            <label className='text-sm'>Date</label>
                            <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className='p-2 max-w-[200px] border rounded-md w-full' />
                        </div>
                        <div className='flex flex-col items-start w-full'>
                            <label className='text-sm'>Time</label>
                            <input
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                type="time"
                                className='p-2 max-w-[200px] border rounded-md w-full'
                                min="09:00" // Set min time to 09:00 (9:00 AM)
                                max="17:30" // Set max time to 17:30 (5:30 PM)
                                step="1800" // Set step to 1800 seconds (30 minutes)
                                // disabled={!isWeekday(date)} // Disable input if selected date is not a weekday
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    </div>
  )
}
