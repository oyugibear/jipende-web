'use client'

import { API_URL } from '@/config/api.config'
import { useAuth } from '@/context/AuthContext'
import { Descriptions, message } from 'antd'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ConfirmationModal from '@/components/Constants/Modals/ConfirmationModal'
import { useRouter } from 'next/navigation'
import { PiArrowLeft, PiTrash, PiEye, PiCalendar, PiUser, PiPhone, PiEnvelope, PiMapPin, PiShield, PiClock, PiIdentificationCard, PiFileText } from 'react-icons/pi'
import { FiRefreshCw } from 'react-icons/fi'
import dayjs from 'dayjs'
import TherapyNotes from '@/components/Pages/Admin/TherapyNotes'
import { userAPI, api } from '@/utils/api'

export default function UserDetailPage() {
    const [userData, setUserData] = useState(null)
    const [profileData, setProfileData] = useState(null)
    const [therapyNotes, setTherapyNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { id } = useParams()
    const [refresh, setRefresh] = useState(false)
    const router = useRouter()
    const { token } = useAuth()

    const getData = async () => {
        try {
            setLoading(true)
            setError(null)
            
            if (!token) {
                setError('Authentication required')
                return
            }
            
            const userResponse = await userAPI.getById(id)

            console.log("`userResponse`", userResponse)

            if (userResponse && userResponse.data) {
                setUserData(userResponse.data)
                setTherapyNotes(userResponse.data.therapy_notes || [])
                
                // Try to get profile data if profile_id exists
                if (userResponse.data.profile_id) {
                    try {
                        const profileResponse = await api.get(`/api/v1/profiles/${userResponse.data.profile_id}`)
                        if (profileResponse && profileResponse.data) {
                            setProfileData(profileResponse.data)
                        }
                    } catch (profileError) {
                        console.log("Profile not found or not accessible")
                        setProfileData(null)
                    }
                }
            } else {
                setError('User not found')
            }
        } catch (error) {
            console.error("Error fetching user:", error)
            setError('Failed to load user details. Please try again.')
            setUserData(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id && token) {
            getData()
        }
    }, [id, refresh, token])

    const handleGoBack = () => {
        router.push('/admin')
    }

    const handleRetry = () => {
        getData()
    }

    const userItems = [
        {
            key: '1',
            label: 'Full Name',
            children: (
                <div className="flex items-center gap-1">
                    <PiUser size={16} className="text-blue-500" />
                    <span className="font-medium">{`${userData?.first_name || ''} ${userData?.second_name || ''}`.trim() || 'No name provided'}</span>
                </div>
            )
        },
        {
            key: '2',
            label: 'Email',
            children: (
                <div className="flex items-center gap-1">
                    <PiEnvelope size={16} className="text-green-500" />
                    <span>{userData?.email || 'No email provided'}</span>
                </div>
            )
        },
        {
            key: '3',
            label: 'Phone Number',
            children: (
                <div className="flex items-center gap-1">
                    <PiPhone size={16} className="text-purple-500" />
                    <span>{userData?.phone_number || 'No phone number provided'}</span>
                </div>
            )
        },
        {
            key: '4',
            label: 'Date of Birth',
            children: userData?.date_of_birth ? (
                <div className="flex items-center gap-1">
                    <PiCalendar size={16} className="text-gray-500" />
                    <span>{dayjs(userData.date_of_birth).format('MMMM D, YYYY')}</span>
                </div>
            ) : 'Not provided'
        },
        {
            key: '5',
            label: 'Country of Residence',
            children: (
                <div className="flex items-center gap-1">
                    <PiMapPin size={16} className="text-red-500" />
                    <span>{userData?.country_of_residence || 'Not specified'}</span>
                </div>
            )
        },
        {
            key: '6',
            label: 'Nationality',
            children: (
                <div className="flex items-center gap-1">
                    <PiIdentificationCard size={16} className="text-pink-500" />
                    <span>{userData?.nationality || 'Not specified'}</span>
                </div>
            )
        },
        {
            key: '7',
            label: 'Role',
            children: (
                <div className="flex items-center gap-1">
                    <PiShield size={16} className="text-orange-500" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        userData?.role === 'admin' 
                            ? 'bg-red-100 text-red-700' 
                            : userData?.role === 'user'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                    }`}>
                        {userData?.role || 'Unknown'}
                    </span>
                </div>
            )
        },
        {
            key: '8',
            label: 'Profile Status',
            children: (
                <div className="flex items-center gap-1">
                    <PiFileText size={16} className="text-indigo-500" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        userData?.profile_status === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : userData?.profile_status === 'started'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                    }`}>
                        {userData?.profile_status || 'Not Started'}
                    </span>
                </div>
            )
        },
        {
            key: '9',
            label: 'Account Created',
            children: userData?.createdAt ? (
                <div className="flex items-center gap-1">
                    <PiClock size={16} className="text-gray-500" />
                    <span>{dayjs(userData.createdAt).format('MMMM D, YYYY [at] h:mm A')}</span>
                </div>
            ) : 'Not available'
        }
    ]

    const profileDetails = [
        { key: '2', label: 'Current Psychiatric Services', children: profileData?.currentPsychiatricServices || 'Not specified' },
        { key: '3', label: 'Had Previous Therapist', children: profileData?.hadPreviousTherapist || 'Not specified' },
        { key: '4', label: 'Previous Therapist', children: profileData?.previousTherapist || 'Not specified' },
        { key: '5', label: 'Taking Prescribed Medication', children: profileData?.takingPrescribedMedication || 'Not specified' },
        { key: '6', label: 'Prescribed Medication', children: profileData?.prescribedMedication || 'Not specified' },
        { key: '7', label: 'Prescribed By', children: profileData?.prescribedBy || 'Not specified' },
        { key: '8', label: 'Has Primary Doctor', children: profileData?.hasPrimaryDoctor || 'Not specified' },
        { key: '9', label: 'Primary Doctor', children: profileData?.primaryDoctor || 'Not specified' },
        { key: '10', label: 'Physical Health', children: profileData?.physicalHealth || 'Not specified' },
        { key: '11', label: 'Health Concerns', children: profileData?.healthConcerns || 'Not specified' },
        { key: '12', label: 'Sleep Problems', children: profileData?.sleepProblems || 'Not specified' },
        { key: '13', label: 'Exercise Per Week', children: profileData?.exercisePerWeek || 'Not specified' },
        { key: '14', label: 'Exercise Types', children: profileData?.exerciseTypes || 'Not specified' },
        { key: '15', label: 'Relationship Status', children: profileData?.relationship || 'Not specified' },
        { key: '16', label: 'Therapy Goals', children: profileData?.therapyGoals || 'Not specified' },
        { key: '17', label: 'Personal Strengths', children: profileData?.personalStrengths || 'Not specified' },
        { key: '18', label: 'Coping Strategy', children: profileData?.copingStrategy || 'Not specified' }
    ]

    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const handleDelete = async () => {
        try {
            setDeleting(true)
            
            if (!token) {
                message.error('Authentication required')
                return
            }
            
            const response = await userAPI.delete(userData?._id)
            if (response) {
                message.success('User deleted successfully')
                setDeleteOpen(false)
                router.push('/admin')
            }
        } catch (error) {
            console.error("Delete error:", error)
            message.error('Failed to delete user. Please try again.')
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
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading User Details</h3>
                    <p className="text-gray-500">Please wait while we fetch the user information...</p>
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading User</h3>
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

    // No user found
    if (!userData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center max-w-md">
                    <div className="bg-gray-50 rounded-full p-6 mb-6 mx-auto w-fit">
                        <PiEye size={48} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">User Not Found</h3>
                    <p className="text-gray-600 mb-6">The user you're looking for doesn't exist or has been removed.</p>
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
                    <h1 className='text-base font-bold text-gray-900'>User Details</h1>
                </div>

                {/* User Content */}
                <div className='bg-white rounded-lg shadow-sm p-6 md:p-8'>
                    {/* User Info and Actions */}
                    <div className='flex flex-col lg:flex-row gap-6 mb-8'>
                        {/* Quick Info */}
                        <div className='lg:w-2/3 flex flex-col justify-between'>
                            <div>
                                <h2 className='text-xl md:text-2xl font-bold text-gray-900 mb-4'>
                                    {`${userData?.first_name || ''} ${userData?.second_name || ''}`.trim() || 'Unknown User'}
                                </h2>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                                    <div className='text-center p-3 bg-gray-50 rounded-lg'>
                                        <PiEnvelope size={20} className='mx-auto text-green-500 mb-1' />
                                        <div className='text-xs text-gray-500'>Email</div>
                                        <div className='font-medium text-sm truncate'>{userData?.email || 'N/A'}</div>
                                    </div>
                                    <div className='text-center p-3 bg-gray-50 rounded-lg'>
                                        <PiPhone size={20} className='mx-auto text-purple-500 mb-1' />
                                        <div className='text-xs text-gray-500'>Phone</div>
                                        <div className='font-medium text-sm'>{userData?.phone_number || 'N/A'}</div>
                                    </div>
                                    <div className='text-center p-3 bg-gray-50 rounded-lg'>
                                        <PiShield size={20} className='mx-auto text-orange-500 mb-1' />
                                        <div className='text-xs text-gray-500'>Role</div>
                                        <div className='font-medium text-sm capitalize'>{userData?.role || 'N/A'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className='flex gap-3 self-start text-xs'>
                                <button  
                                    onClick={showDeleteModal} 
                                    disabled={deleting}
                                    className='flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200'
                                >
                                    <PiTrash size={16} />
                                    {deleting ? 'Deleting...' : 'Delete User'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Information */}
                    <div className='border-t border-gray-200 pt-6'>
                        <h3 className='text-lg font-semibold text-gray-900 mb-4'>User Information</h3>
                        <Descriptions 
                            bordered 
                            layout="vertical" 
                            items={userItems}
                            className="custom-descriptions"
                        />

                        <TherapyNotes notes={therapyNotes} />

                        {/* Profile Information */}
                        <div className='mt-8'>
                            <h3 className='text-lg font-semibold text-gray-900 mb-4'>Profile Information</h3>
                            {profileData ? (
                                <Descriptions 
                                    bordered 
                                    layout="vertical" 
                                    items={profileDetails}
                                    className="custom-descriptions"
                                />
                            ) : (
                                <div className='py-8 flex flex-col gap-2 items-center justify-center bg-gray-50 rounded-lg'>
                                    <PiFileText size={48} className="text-gray-400 mb-2" />
                                    <h4 className='italic font-medium text-gray-700'>Profile Not Started</h4>
                                    <p className='text-gray-500 text-center'>Please ask the client to complete their information on the adult intake form</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal 
                isOpen={deleteOpen} 
                setIsOpen={setDeleteOpen} 
                handleFunction={handleDelete}
                title="Delete User"
                message={`Are you sure you want to delete "${userData?.first_name} ${userData?.second_name}"? This action cannot be undone.`}
                confirmText="Delete User"
                cancelText="Cancel"
            />
        </div>
    )
}
