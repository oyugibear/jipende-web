'use client'

import { API_URL } from '@/config/api.config'
import { Descriptions, Image, Modal, message } from 'antd'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ConfirmationModal from '@/components/Constants/Modals/ConfirmationModal'
import { useRouter } from 'next/navigation'
import BlogModal from '@/components/Pages/Admin/modals/BlogModal'
import { PiArrowLeft, PiPencil, PiTrash, PiEye, PiCalendar, PiUser, PiClock } from 'react-icons/pi'
import { FiRefreshCw } from 'react-icons/fi'
import dayjs from 'dayjs'

export default function BlogDetailPage() {
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { id } = useParams()
    const [refresh, setRefresh] = useState(false)
    const router = useRouter()

    const getData = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await axios.get(`${API_URL}/blogs/${id}`)
            if (response.data && response.data.data) {
                setBlog(response.data.data)
            } else {
                setError('Blog not found')
            }
        } catch (error) {
            console.error("Error fetching blog:", error)
            setError('Failed to load blog details. Please try again.')
            setBlog(null)
        } finally {
            setLoading(false)
        }
    }

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
            children: <span className="font-medium">{blog?.title || 'No title'}</span>
        },
        {
            key: '2',
            label: 'Reading Time',
            children: (
                <div className="flex items-center gap-1">
                    <PiClock size={16} className="text-gray-500" />
                    <span>{blog?.reading_time || 'Not specified'}</span>
                </div>
            )
        },
        {
            key: '3',
            label: 'Author',
            children: (
                <div className="flex items-center gap-1">
                    <PiUser size={16} className="text-gray-500" />
                    <span>{blog?.author || 'Unknown author'}</span>
                </div>
            )
        },
        {
            key: '4',
            label: 'About Author',
            children: (
                <div className="flex items-center gap-1">
                    <PiUser size={16} className="text-gray-500" />
                    <span>{blog?.about_author || 'Unknown author'}</span>
                </div>
            )
        },
        {
            key: '5',
            label: 'Publisher',
            children: blog?.publisher || 'Not specified'
        },
        {
            key: '6',
            label: 'Status',
            children: (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    blog?.status === 'published' 
                        ? 'bg-green-100 text-green-700' 
                        : blog?.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                }`}>
                    {blog?.status || 'Unknown'}
                </span>
            )
        },
        {
            key: '7',
            label: 'Category',
            children: blog?.category ? (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                    {blog.category}
                </span>
            ) : 'No category'
        },
        {
            key: '8',
            label: 'Created Date',
            children: blog?.createdAt ? (
                <div className="flex items-center gap-1">
                    <PiCalendar size={16} className="text-gray-500" />
                    <span>{dayjs(blog.createdAt).format('MMMM D, YYYY')}</span>
                </div>
            ) : 'Not available'
        },
        {
            key: '9',
            label: 'Description',
            children: (
                <div className="max-w-2xl">
                    <p className="text-gray-700 leading-relaxed">
                        {blog?.description || 'No description available'}
                    </p>
                </div>
            ),
            span: 3
        },
        {
            key: '10',
            label: 'Blog Content',
            children: (
                <div className="max-w-4xl">
                    <div 
                        className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ 
                            __html: blog?.blog_text || blog?.content || 'No content available' 
                        }}
                    />
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

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleDelete = async () => {
        try {
            setDeleting(true)
            const { data } = await axios.delete(`${API_URL}/blog/${blog?._id}`)
            if (data) {
                message.success('Blog deleted successfully')
                setDeleteOpen(false)
                router.push('/admin')
            }
        } catch (error) {
            console.error("Delete error:", error)
            message.error('Failed to delete blog. Please try again.')
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
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Blog Details</h3>
                    <p className="text-gray-500">Please wait while we fetch the blog information...</p>
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Blog</h3>
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

    // No blog found
    if (!blog) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center max-w-md">
                    <div className="bg-gray-50 rounded-full p-6 mb-6 mx-auto w-fit">
                        <PiEye size={48} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Blog Not Found</h3>
                    <p className="text-gray-600 mb-6">The blog you're looking for doesn't exist or has been removed.</p>
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
                    <h1 className='text-base font-bold text-gray-900'>Blog Details</h1>
                </div>

                {/* Blog Content */}
                <div className='bg-white rounded-lg shadow-sm p-6 md:p-8'>
                    {/* Blog Image and Actions */}
                    <div className='flex flex-col lg:flex-row gap-6 mb-8'>
                        {/* Image */}
                        <div className='lg:w-1/3'>
                            {blog?.picture ? (
                                <div className='relative group'>
                                    <Image 
                                        src={blog.picture} 
                                        alt={blog.title || 'Blog image'} 
                                        className='w-full rounded-lg shadow-md object-cover'
                                        style={{ aspectRatio: '16/10' }}
                                    />
                                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 rounded-lg' />
                                </div>
                            ) : (
                                <div className='w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center'>
                                    <span className='text-gray-400'>No image available</span>
                                </div>
                            )}
                        </div>

                        {/* Quick Info and Actions */}
                        <div className='lg:w-2/3 flex flex-col justify-between'>
                            <div>
                                <h2 className='text-xl md:text-2xl font-bold text-gray-900 mb-4'>
                                    {blog?.title || 'Untitled Blog'}
                                </h2>
                                <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-6'>
                                    <div className='text-center p-3 bg-gray-50 rounded-lg'>
                                        <PiUser size={20} className='mx-auto text-yellow-500 mb-1' />
                                        <div className='text-xs text-gray-500'>Author</div>
                                        <div className='font-medium text-sm'>{blog?.author || 'Unknown'}</div>
                                    </div>
                                    <div className='text-center p-3 bg-gray-50 rounded-lg'>
                                        <PiClock size={20} className='mx-auto text-yellow-500 mb-1' />
                                        <div className='text-xs text-gray-500'>Reading Time</div>
                                        <div className='font-medium text-sm'>{blog?.reading_time || 'N/A'}</div>
                                    </div>
                                    <div className='text-center p-3 bg-gray-50 rounded-lg'>
                                        <PiCalendar size={20} className='mx-auto text-yellow-500 mb-1' />
                                        <div className='text-xs text-gray-500'>Created</div>
                                        <div className='font-medium text-sm'>
                                            {blog?.createdAt ? dayjs(blog.createdAt).format('MMM D, YYYY') : 'N/A'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className='flex gap-3 self-end text-xs'>
                                <button  
                                    onClick={showModal} 
                                    className='flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200'
                                >
                                    <PiPencil size={16} />
                                    Edit Blog
                                </button>
                                <button  
                                    onClick={showDeleteModal} 
                                    disabled={deleting}
                                    className='flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200'
                                >
                                    <PiTrash size={16} />
                                    {deleting ? 'Deleting...' : 'Delete Blog'}
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
            <BlogModal 
                isOpen={isModalOpen} 
                setIsOpen={setIsModalOpen} 
                type='edit' 
                details={blog} 
                setRefresh={setRefresh}
            />
            <ConfirmationModal 
                isOpen={deleteOpen} 
                setIsOpen={setDeleteOpen} 
                handleFunction={handleDelete}
                title="Delete Blog"
                message={`Are you sure you want to delete "${blog?.title}"? This action cannot be undone.`}
                confirmText="Delete Blog"
                cancelText="Cancel"
            />
        </div>
    )
}
