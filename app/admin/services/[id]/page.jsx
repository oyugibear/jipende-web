'use client'

import ServiceModal from '@/components/Pages/Admin/modals/ServiceModal'
import { API_URL } from '@/config/api.config'
import { Descriptions, Image, message } from 'antd'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ConfirmationModal from '@/components/Constants/Modals/ConfirmationModal'
import { useRouter } from 'next/navigation'
import { PiArrowLeft, PiPencil, PiTrash, PiEye, PiCalendar, PiUser, PiClock, PiMapPin, PiUsers, PiCurrencyDollar, PiTag } from 'react-icons/pi'
import { FiRefreshCw } from 'react-icons/fi'
import dayjs from 'dayjs'

export default function ServiceDetailPage() {
    const [service, setService] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { id } = useParams()
    const [refresh, setRefresh] = useState(false)
    const router = useRouter()

    const getData = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await axios.get(`${API_URL}/services/${id}`)
            if (response.data) {
                setService(response.data.data)
                console.log("Service data:", response.data)
            } else {
                setError('Service not found')
            }
        } catch (error) {
            console.error("Error fetching service:", error)
            setError('Failed to load service details. Please try again.')
            setService(null)
        } finally {
            setLoading(false)
        }
    }

    console.log("service", service)
    useEffect(() => {
        if (id) {
            getData()
        }
    }, [id, refresh])

    const handleGoBack = () => {
        router.push('/admin')
    }

    const handleRetry = () => {
        getData()
    }

    const items = [
        {
            key: '1',
            label: 'Title',
            children: <span className="font-medium">{service?.title || 'No title'}</span>
        },
        {
            key: '2',
            label: 'Price',
            children: (
                <div className="flex items-center gap-1">
                    <PiCurrencyDollar size={16} className="text-green-500" />
                    <span className="font-semibold text-green-600">${service?.price || 'TBD'}</span>
                </div>
            )
        },
        {
            key: '3',
            label: 'Max Attendees',
            children: (
                <div className="flex items-center gap-1">
                    <PiUsers size={16} className="text-blue-500" />
                    <span>{service?.number_of_attendees || 'Not specified'}</span>
                </div>
            )
        },
        {
            key: '4',
            label: 'Location',
            children: (
                <div className="flex items-center gap-1">
                    <PiMapPin size={16} className="text-red-500" />
                    <span>{service?.location || 'Not specified'}</span>
                </div>
            )
        },
        {
            key: '5',
            label: 'Duration',
            children: (
                <div className="flex items-center gap-1">
                    <PiClock size={16} className="text-purple-500" />
                    <span>{service?.duration || 'Not specified'}</span>
                </div>
            )
        },
        {
            key: '6',
            label: 'Category',
            children: service?.category ? (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                    {service.category}
                </span>
            ) : 'No category'
        },
        {
            key: '7',
            label: 'Availability',
            children: (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    service?.availability === 'available' 
                        ? 'bg-green-100 text-green-700' 
                        : service?.availability === 'unavailable'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700'
                }`}>
                    {service?.availability || 'Unknown'}
                </span>
            )
        },
        {
            key: '8',
            label: 'Created Date',
            children: service?.createdAt ? (
                <div className="flex items-center gap-1">
                    <PiCalendar size={16} className="text-gray-500" />
                    <span>{dayjs(service.createdAt).format('MMMM D, YYYY')}</span>
                </div>
            ) : 'Not available'
        },
        {
            key: '9',
            label: 'Description',
            children: (
                <div className="max-w-2xl">
                    <p className="text-gray-700 leading-relaxed">
                        {service?.description || 'No description available'}
                    </p>
                </div>
            ),
            span: 3
        }
    ]

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleDelete = async () => {
        try {
            setDeleting(true)
            const { data } = await axios.delete(`${API_URL}/service/${service?._id}`)
            if (data) {
                message.success('Service deleted successfully')
                setDeleteOpen(false)
                router.push('/admin')
            }
        } catch (error) {
            console.error("Delete error:", error)
            message.error('Failed to delete service. Please try again.')
        } finally {
            setDeleting(false)
        }
    }

    const showDeleteModal = () => {
        setDeleteOpen(true)
    }

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mb-6 mx-auto"></div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Service Details</h3>
                    <p className="text-gray-500">Please wait while we fetch the service information...</p>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center max-w-md">
                    <div className="bg-red-50 rounded-full p-6 mb-6 mx-auto w-fit">
                        <FiRefreshCw size={48} className="text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Service</h3>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={handleRetry}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                        >
                            <FiRefreshCw size={16} />
                            Try Again
                        </button>
                        <button
                            onClick={handleGoBack}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                        >
                            <PiArrowLeft size={16} />
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // No service found
    if (!service) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center max-w-md">
                    <div className="bg-gray-50 rounded-full p-6 mb-6 mx-auto w-fit">
                        <PiEye size={48} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Not Found</h3>
                    <p className="text-gray-600 mb-6">The service you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={handleGoBack}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
                    >
                        <PiArrowLeft size={16} />
                        Back to Admin
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col w-full items-center justify-center py-8 px-4 min-h-screen bg-gray-50'>
            <div className='max-w-[1200px] w-full'>
                {/* Header */}
                <div className='flex items-center justify-between mb-8 text-sm'>
                    <div className='flex items-center gap-4'>
                        <button 
                            onClick={handleGoBack}
                            className='flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors duration-200'
                        >
                            <PiArrowLeft size={20} />
                            <span className='text-sm'>Back to Admin</span>
                        </button>
                    </div>
                    <h1 className='text-base font-bold text-gray-900'>Service Details</h1>
                </div>

                {/* Service Content */}
                <div className='bg-white rounded-lg shadow-sm p-6 md:p-8'>
                    {/* Service Image and Actions */}
                    <div className='flex flex-col lg:flex-row gap-6 mb-8'>
                        {/* Quick Info and Actions */}
                        <div className='lg:w-2/3 flex flex-col justify-between'>
                            <div>
                                <h2 className='text-xl md:text-2xl font-bold text-gray-900 mb-4'>
                                    {service?.title || 'Untitled Service'}
                                </h2>
                                <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-6'>
                                    <div className='text-center p-3 bg-gray-50 rounded-lg'>
                                        <PiCurrencyDollar size={20} className='mx-auto text-green-500 mb-1' />
                                        <div className='text-xs text-gray-500'>Price</div>
                                        <div className='font-medium text-sm text-green-600'>${service?.price || 'TBD'}</div>
                                    </div>
                                    <div className='text-center p-3 bg-gray-50 rounded-lg'>
                                        <PiUsers size={20} className='mx-auto text-blue-500 mb-1' />
                                        <div className='text-xs text-gray-500'>Max Attendees</div>
                                        <div className='font-medium text-sm'>{service?.number_of_attendees || 'N/A'}</div>
                                    </div>
                                    <div className='text-center p-3 bg-gray-50 rounded-lg'>
                                        <PiClock size={20} className='mx-auto text-purple-500 mb-1' />
                                        <div className='text-xs text-gray-500'>Duration</div>
                                        <div className='font-medium text-sm'>{service?.duration || 'N/A'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className='flex gap-3 self-start text-xs'>
                                <button  
                                    onClick={showModal} 
                                    className='flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200'
                                >
                                    <PiPencil size={16} />
                                    Edit Service
                                </button>
                                <button  
                                    onClick={showDeleteModal} 
                                    disabled={deleting}
                                    className='flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200'
                                >
                                    <PiTrash size={16} />
                                    {deleting ? 'Deleting...' : 'Delete Service'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Information */}
                    <div className='border-t border-gray-200 pt-6'>
                        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Detailed Information</h3>
                        <Descriptions 
                            bordered 
                            layout="vertical" 
                            items={items}
                            className="custom-descriptions"
                        />
                    </div>
                </div>
            </div>

            {/* Modals */}
            <ServiceModal 
                isOpen={isModalOpen} 
                setIsOpen={setIsModalOpen} 
                type='edit' 
                serviceDetails={service} 
                setRefresh={setRefresh}
            />
            <ConfirmationModal 
                isOpen={deleteOpen} 
                setIsOpen={setDeleteOpen} 
                handleFunction={handleDelete}
                title="Delete Service"
                message={`Are you sure you want to delete "${service?.title}"? This action cannot be undone.`}
                confirmText="Delete Service"
                cancelText="Cancel"
            />
        </div>
    )
}
