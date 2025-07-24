'use client'

import React, { useEffect, useState } from 'react'
import { IoMdPeople } from 'react-icons/io'
import { PiClockFill } from 'react-icons/pi'
import { FiShoppingCart } from 'react-icons/fi'
import ReviewList from '@/components/Pages/Review/ReviewList'
import Card from '@/components/Pages/Services/ServiceCard/Card'
import RelatedServices from '@/components/Pages/RelatedServices/RelatedServices'
import { useAuth } from '@/context/AuthContext'
import { serviceAPI, bookingAPI } from '@/utils/api'
import { useDispatch } from 'react-redux'
import { addProduct } from '@/app/GlobalRedux/Features/cart/CartSlice'
import { Modal, message, Image, DatePicker, TimePicker } from 'antd'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'


export default function ServicePage({
    params
}) {
    const { user, isAuthenticated } = useAuth();
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
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

    const handleClick = async () => {
        if (!isAuthenticated) {
            message.warning('Please login to book a service');
            router.push('/auth/login');
            return;
        }

        if (!date || !time) {
            message.error('Please select both date and time');
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
            
            // Reset form
            setDate('');
            setTime('');
            
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
    
    const handleOk = () => {
        handleClick();
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
        setDate('');
        setTime('');
    };


    const range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
    };

    const disabledDate = (current) => {
        // Disable days before today and weekends (Saturday and Sunday)
        return (
            current &&
            (current < dayjs().endOf('day') || current.day() === 0 || current.day() === 6)
        );
    };
    const disabledDateTime = () => ({
        disabledHours: () => range(0, 8).concat(range(19, 24)), // Disable hours outside 8 AM to 7 PM
        disabledMinutes: () => range(0, 60).filter(min => min !== 0 && min !== 30), // Allow only 00 and 30 minutes
    });

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

            <Modal open={isModalOpen} onCancel={handleCancel} footer={[<button onClick={handleClick}  className={`bg-yellow-500 text-white font-bold rounded-lg py-2 px-4 ${(!date || !time) && 'bg-gray-400 cursor-not-allowed'}`} disabled={!date || !time}> Add to Cart </button>]} >
                <div className='flex flex-col items-center my-4 py-8'>
                    <p className='text-lg font-bold '>Select Session Date & Time</p>
                    <p className='text-sm text-center'>Please select the date and time you would like to attend this session. You can review your selection in the cart.</p>
                    
                    
                    <div className='flex flex-col md:flex-row items-center gap-4 my-4'>
                   
                    
                        <div className='flex flex-col items-start w-full'>
                            <label className='text-sm'>Date</label>
                            <DatePicker
                                format="YYYY-MM-DD"
                                disabledDate={disabledDate}
                                onChange={(value, dateString) => {
                                    console.log('Formatted Selected Time: ', dateString);
                                    setDate(dateString)
                                }}
                            
                            />
                        </div>
                        <div className='flex flex-col items-start w-full'>
                            <label className='text-sm'>Time</label>
                            <TimePicker
                                format="HH:mm"
                                defaultValue={dayjs('08:30', 'HH:mm')} // Set a default value in the correct format
                                disabledTime={disabledDateTime}
                                onChange={(value) => {
                                    if (value) {
                                        const formattedTime = value.format('HH:mm'); // Format the selected time
                                        console.log('Selected Time: ', formattedTime);
                                        setTime(formattedTime); // Set the formatted time
                                    }
                                }}
                                renderExtraFooter={() => null} // Disables the footer by rendering nothing
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    </div>
  )
}
