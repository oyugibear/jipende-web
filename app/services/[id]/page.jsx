'use client'

import React, { useEffect, useState } from 'react'
import { IoMdPeople } from 'react-icons/io'
import { PiClockFill } from 'react-icons/pi'
import { FiShoppingCart } from 'react-icons/fi'
import ReviewList from '@/components/Pages/Review/ReviewList'
import Card from '@/components/Pages/Services/ServiceCard/Card'
import RelatedServices from '@/components/Pages/RelatedServices/RelatedServices'
import BookingModal from '@/components/Pages/Services/BookingModal'
import { useAuth } from '@/context/AuthContext'
import { serviceAPI, bookingAPI } from '@/utils/api'
import { useDispatch } from 'react-redux'
import { addProduct } from '@/app/GlobalRedux/Features/cart/CartSlice'
import { message, Image } from 'antd'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'


export default function ServicePage({
    params
}) {
    const { user, isAuthenticated } = useAuth();
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const fetchService = async () => {
        try {
            const response = await serviceAPI.getById(params.id)
            if (response && response.status) {
                setData(response.data)
            }
        } catch (error) {
            console.error('Error fetching service:', error)
            message.error('Failed to load service details')
        } finally {
            setLoading(false)
        }
    } 

    useEffect(() => {
        fetchService()
    }, [params.id])

    const dispatch = useDispatch()
    let price = data?.price
    const [quantity, setQuantity] = useState(1)
    const router = useRouter()

    const handleBookingConfirm = async ({ date, time }) => {
        if (!isAuthenticated) {
            message.warning('Please login to book a service');
            router.push('/auth/login');
            return;
        }

        try {
            // Add to cart instead of creating booking directly
            const cartItem = {
                product: {
                    _id: data._id,
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    picture: data.picture,
                    duration: data.duration,
                    category: data.category
                },
                date,
                time
            };

            dispatch(addProduct(cartItem));
            
            message.success('Service added to cart successfully!');
            setIsModalOpen(false);
            
            // Redirect to cart page for verification
            router.push('/cart');
            
        } catch (error) {
            console.error('Error adding to cart:', error);
            message.error('Failed to add service to cart');
        }
    }

    const showModal = () => {
        if (!isAuthenticated) {
            message.warning('Please login to book a service');
            router.push('/auth/login');
            return;
        }
        setIsModalOpen(true);
    };
    
    const handleModalCancel = () => {
        setIsModalOpen(false);
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
            </div>
        );
    }

    if (!data || !data.title) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Service not found</h2>
                    <p className="text-gray-600">The service you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }


  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
        <div className='flex flex-col w-full items-center justify-center mx-4 md:mx-0'>
            <div className='flex flex-col w-full max-w-[1440px] md:my-12 py-12 text-sm md:text-base md:px-4'>
                <div className='flex flex-col mx-4 md:mx-0'>
                    <h1 className='text-xl md:text-3xl mb-2 font-medium md:font-normal'>{data?.title}</h1>
                    <p>{data.category}</p>
                </div>

                <div className='flex flex-col md:flex-row items-center justify-evenly mt-8 p-4'>
                    <div className='md:px-4 '>
                        <Image src={data.picture} alt='product Image' className="w-full lg:max-w-[60vw] h-[40vh] object-cover" />
                    </div>

                    <div className='flex flex-col mx-4 w-full max-w-[700px]'>
                        <h2 className='text-xl font-bold mt-6 md:mt-0'>{data.title}</h2>
                        <p className='w-full max-w-[700px] my-4'>
                            {data?.description}
                        </p>
                        <div className='flex flex-row items-center mb-4'>
                            <div className='flex flex-row items-center'>
                                <PiClockFill size={25} className='text-yellow-500'/>
                                <p className='text-sm pl-2'>{data?.duration}</p>
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

            {/* <ReviewList /> */}
            {/* <RelatedServices /> */}

            <BookingModal 
                isOpen={isModalOpen}
                onCancel={handleModalCancel}
                onConfirm={handleBookingConfirm}
                serviceData={data}
            />
        </div>
    </div>
  )
}
