'use client'

import BookingInfoCard from '@/components/Pages/Admin/individual/BookingInfoCard'
import { API_URL } from '@/config/api.config'
import { useAuth } from '@/context/AuthContext'
import { message, Card, Tabs, Form, Input, DatePicker, TimePicker, Button, Select } from 'antd'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { PiArrowLeft, PiCalendar, PiClock, PiLink, PiNotepad, PiUserCircle, PiVideo, PiCheckCircle } from 'react-icons/pi'
import { FiRefreshCw } from 'react-icons/fi'
import dayjs from 'dayjs'
import { bookingAPI, userAPI } from '@/utils/api'

const { TextArea } = Input

export default function BookingDetailPage() {
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()
  const { token } = useAuth()
  const router = useRouter()
  const { user } = useAuth()
  const [therapists, setTherapists] = useState([])


  const getData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      if (!token) {
        setError('Authentication required')
        return
      }
      
      const [userData, bookingData] = await Promise.allSettled([
        userAPI.getAll(),
        bookingAPI.getById(id, token)
      ])

      // Check if the promises were fulfilled
      if (bookingData.status === 'rejected') {
        setError('Failed to load booking details')
        return
      }
      
      if (userData.status === 'rejected') {
        setError('Failed to load therapists')
        return
      }

      // Check if we actually have data
      if (!bookingData.value?.data) {
        setError('Booking not found')
        return
      }

      if (!userData.value?.data) {
        setError('Failed to load therapists')
        return
      }

      // Set the data
      setBooking(bookingData.value.data)
      setTherapists(userData.value.data.filter(user => user.role !== 'Client'))
      
    } catch (error) {
      console.error("Error fetching booking:", error)
      setError('Failed to load booking details. Please try again.')
      setBooking(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id && token) {
      getData()
    }
  }, [id, token])

  const handleGoBack = () => {
    router.push('/admin')
  }

  const handleRetry = () => {
    getData()
  }

  // Form states
  const [createForm] = Form.useForm()
  const [rescheduleForm] = Form.useForm()
  const [completeForm] = Form.useForm()
  
  const [submitting, setSubmitting] = useState(false)

  // API calls with authentication
  const handleAddLink = async (values) => {
    if (!token) {
      message.error('Authentication required')
      return
    }
    
    setSubmitting(true)
    try {
      const { data } = await axios.put(`${API_URL}/bookings/addlink/${id}`, {
        googleMeetLink: values.link,
        therapist: values.therapist,
        status: "link added"
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (data) {
        message.success("Meeting Link Added Successfully")
        createForm.resetFields()
        getData() // Refresh booking data
      }
    } catch (error) {
      message.error("Failed to add meeting link")
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleReschedule = async (values) => {
    if (!token) {
      message.error('Authentication required')
      return
    }
    
    setSubmitting(true)
    try {
      const { data } = await axios.put(`${API_URL}/bookings/rescheduleBooking/${id}`, {
        rescheduleReason: values.reason,
        rescheduleDate: values.newDate.format('YYYY-MM-DD'),
        rescheduleTime: values.newTime.format('HH:mm'),
        rescheduleLink: values.newLink,
        status: "rescheduled",
        therapist: values.therapist
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (data) {
        message.success("Meeting Rescheduled Successfully")
        rescheduleForm.resetFields()
        getData() // Refresh booking data
      }
    } catch (error) {
      message.error("Failed to reschedule meeting")
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCompleteBooking = async (values) => {
    if (!token) {
      message.error('Authentication required')
      return
    }
    
    setSubmitting(true)
    try {
      const { data } = await axios.put(`${API_URL}/bookings/completeBooking/${id}`, {
        therapistNotes: values.meetingNotes,
        nextBookingDate: values.nextBooking ? values.nextBooking.format('YYYY-MM-DD') : null,
        status: "completed",
        therapist: values.therapist
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (data) {
        message.success("Meeting Completed Successfully")
        completeForm.resetFields()
        getData() // Refresh booking data
      }
    } catch (error) {
      message.error("Failed to complete meeting")
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mb-6 mx-auto"></div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Booking Details</h3>
          <p className="text-gray-500">Please wait while we fetch the booking information...</p>
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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Booking</h3>
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

  const tabItems = [
    {
      key: 'create',
      label: (
        <div className="flex items-center gap-2">
          <PiVideo size={16} />
          <span>Create Meeting</span>
        </div>
      ),
      children: (
        <Card className="shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Meeting Link</h3>
            <p className="text-gray-600">Provide meeting details and send the link to the client.</p>
          </div>
          <Form
            form={createForm}
            layout="vertical"
            onFinish={handleAddLink}
            className="space-y-4"
          >
            <Form.Item
              name="link"
              label={
                <div className="flex items-center gap-2">
                  <PiLink size={16} className="text-blue-500" />
                  <span>Google Meet Link</span>
                </div>
              }
              rules={[{ required: true, message: 'Please enter the meeting link' }]}
            >
              <Input placeholder="https://meet.google.com/..." className="h-10" />
            </Form.Item>
            
            <Form.Item
              name="therapist"
              label={
                <div className="flex items-center gap-2">
                  <PiUserCircle size={16} className="text-green-500" />
                  <span>Therapist Name</span>
                </div>
              }
              rules={[{ required: true, message: 'Please enter the therapist name' }]}
            >
              <Select
                placeholder="Select a therapist"
                className="h-10"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={therapists.map(therapist => ({
                  value: therapist._id,
                  label: `${therapist.first_name || ''} ${therapist.second_name || ''}`.trim() || therapist.email,
                  key: therapist._id
                }))}
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={submitting}
                className="bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 h-10 px-6"
              >
                {submitting ? 'Sending...' : 'Save & Send to Client'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )
    },
    {
      key: 'reschedule',
      label: (
        <div className="flex items-center gap-2">
          <PiCalendar size={16} />
          <span>Reschedule Session</span>
        </div>
      ),
      children: (
        <Card className="shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reschedule Session</h3>
            <p className="text-gray-600">Update the session date, time, and provide a reason for rescheduling.</p>
          </div>
          <Form
            form={rescheduleForm}
            layout="vertical"
            onFinish={handleReschedule}
            className="space-y-4"
          >
            <Form.Item
              name="reason"
              label="Reschedule Reason"
              rules={[{ required: true, message: 'Please provide a reason for rescheduling' }]}
            >
              <TextArea 
                rows={3} 
                placeholder="Please explain why this session needs to be rescheduled..."
                className="resize-none"
              />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="newDate"
                label={
                  <div className="flex items-center gap-2">
                    <PiCalendar size={16} className="text-purple-500" />
                    <span>New Date</span>
                  </div>
                }
                rules={[{ required: true, message: 'Please select a new date' }]}
              >
                <DatePicker className="w-full h-10" />
              </Form.Item>

              <Form.Item
                name="newTime"
                label={
                  <div className="flex items-center gap-2">
                    <PiClock size={16} className="text-orange-500" />
                    <span>New Time</span>
                  </div>
                }
                rules={[{ required: true, message: 'Please select a new time' }]}
              >
                <TimePicker className="w-full h-10" format="HH:mm" />
              </Form.Item>
            </div>

            <Form.Item
              name="newLink"
              label={
                <div className="flex items-center gap-2">
                  <PiLink size={16} className="text-blue-500" />
                  <span>New Meeting Link</span>
                </div>
              }
              rules={[{ required: true, message: 'Please enter the new meeting link' }]}
            >
              <Input placeholder="https://meet.google.com/..." className="h-10" />
            </Form.Item>
            
            <Form.Item
              name="therapist"
              label={
                <div className="flex items-center gap-2">
                  <PiUserCircle size={16} className="text-green-500" />
                  <span>Therapist Name</span>
                </div>
              }
              rules={[{ required: true, message: 'Please enter the therapist name' }]}
            >
              <Select
                placeholder="Select a therapist"
                className="h-10"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={therapists.map(therapist => ({
                  value: therapist._id,
                  label: `${therapist.first_name || ''} ${therapist.second_name || ''}`.trim() || therapist.email,
                  key: therapist._id
                }))}
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={submitting}
                className="bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 h-10 px-6"
              >
                {submitting ? 'Rescheduling...' : 'Save & Send Update'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )
    },
    {
      key: 'complete',
      label: (
        <div className="flex items-center gap-2">
          <PiCheckCircle size={16} />
          <span>Complete Session</span>
        </div>
      ),
      children: (
        <Card className="shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Session</h3>
            <p className="text-gray-600">Add session notes and schedule the next appointment if needed.</p>
          </div>
          <Form
            form={completeForm}
            layout="vertical"
            onFinish={handleCompleteBooking}
            className="space-y-4"
          >
            <Form.Item
              name="meetingNotes"
              label={
                <div className="flex items-center gap-2">
                  <PiNotepad size={16} className="text-indigo-500" />
                  <span>Session Notes</span>
                </div>
              }
              rules={[{ required: true, message: 'Please add session notes' }]}
            >
              <TextArea 
                rows={5} 
                placeholder="Document key points, observations, progress, and any important notes from this session..."
                className="resize-none"
              />
            </Form.Item>

            <Form.Item
              name="nextBooking"
              label={
                <div className="flex items-center gap-2">
                  <PiCalendar size={16} className="text-green-500" />
                  <span>Next Appointment Date (Optional)</span>
                </div>
              }
            >
              <DatePicker className="w-full h-10" placeholder="Select next appointment date" />
            </Form.Item>

            <Form.Item
              name="therapist"
              label={
                <div className="flex items-center gap-2">
                  <PiUserCircle size={16} className="text-green-500" />
                  <span>Therapist Name</span>
                </div>
              }
              rules={[{ required: true, message: 'Please enter the therapist name' }]}
            >
              <Select
                placeholder="Select a therapist"
                className="h-10"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={therapists.map(therapist => ({
                  value: therapist._id,
                  label: `${therapist.first_name || ''} ${therapist.second_name || ''}`.trim() || therapist.email,
                  key: therapist._id
                }))}
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={submitting}
                className="bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 h-10 px-6"
              >
                {submitting ? 'Completing...' : 'Complete Session'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )
    }
  ]

  return (
    <div className='flex flex-col w-full items-center justify-center py-8 px-4 min-h-screen bg-gray-50'>
      <div className='max-w-[1200px] w-full'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center gap-4'>
            <button 
              onClick={handleGoBack}
              className='flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors duration-200'
            >
              <PiArrowLeft size={20} />
              <span className='text-sm'>Back to Admin</span>
            </button>
          </div>
          <h1 className='text-base font-bold text-gray-900'>Booking Management</h1>
        </div>

        {/* Booking Information Card */}
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>Booking Information</h2>
          <BookingInfoCard booking={booking} />
        </div>

        {/* Booking Controls */}
        <div className='bg-white rounded-lg shadow-sm p-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>Session Management</h2>
          <p className='text-gray-600 mb-6'>Manage meeting links, reschedule sessions, or complete bookings.</p>
          
          <Tabs
            items={tabItems}
            defaultActiveKey="create"
            className="booking-management-tabs"
          />
        </div>
      </div>
    </div>
  )
}
