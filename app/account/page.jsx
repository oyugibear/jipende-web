'use client'

import React, { useEffect, useState } from 'react'
import { Spin, Alert, Button, Tabs, Card, Descriptions, Form, Input, Select, message, Popconfirm, Space, Typography } from 'antd'
import { UserOutlined, FileTextOutlined, SettingOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons'
import Hero from '@/components/Constants/Hero'
import { useAuth } from '@/context/AuthContext'
import { bookingAPI, paymentAPI, userAPI } from '@/utils/api'
import RecieptCard from '@/components/Pages/Account/RecieptCard'

const { Title, Text } = Typography
const { Option } = Select

// Modern account page with Ant Design
export default function AccountPage() {
  const { user, isAuthenticated, updateUser } = useAuth()
  const [bookings, setBookings] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('receipts')
  const [editMode, setEditMode] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    if (user && isAuthenticated) {
      fetchUserData()
    } else {
      setLoading(false)
    }
  }, [user, isAuthenticated])

  const fetchUserData = async () => {
    if (!user?._id) return

    try {
      setLoading(true)
      setError(null)

      const [bookingsResponse, paymentsResponse] = await Promise.all([
        bookingAPI.getUserBookings(user._id),
        paymentAPI.getUserPayments(user._id)
      ])

      if (bookingsResponse?.status && bookingsResponse?.data) {
        setBookings(Array.isArray(bookingsResponse.data) ? bookingsResponse.data : [])
      } else {
        setBookings([])
      }

      if (paymentsResponse?.status && paymentsResponse?.data) {
        setPayments(Array.isArray(paymentsResponse.data) ? paymentsResponse.data : [])
      } else {
        setPayments([])
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      setError('Failed to load account data. Please try again later.')
      setBookings([])
      setPayments([])
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (values) => {
    try {
      setUpdating(true)
      const updatedData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        gender: values.gender,
        age: values.age,
      }

      const response = await userAPI.update(user._id, updatedData)
      
      if (response?.status) {
        message.success('Profile updated successfully!')
        updateUser({ ...user, ...updatedData })
        setEditMode(false)
      } else {
        throw new Error(response?.message || 'Update failed')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      message.error('Failed to update profile. Please try again.')
    } finally {
      setUpdating(false)
    }
  }

  const handleDeleteAccount = () => {
    message.warning('Account deletion request received. You will be contacted via email for confirmation.')
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Hero title="Your Account" description="Manage all your sessions and account information" />
        <div className="container mx-auto px-4 py-12">
          <Alert
            type="warning"
            message="Authentication Required"
            description="Please log in to access your account."
            className="max-w-md mx-auto"
            showIcon
          />
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Hero title="Your Account" description="Manage all your sessions and account information" />
        <div className="flex justify-center items-center py-20">
          <Spin size="large" />
        </div>
      </div>
    )
  }

  const tabItems = [
    {
      key: 'receipts',
      label: (
        <span className='flex gap-2'>
          <FileTextOutlined />
          Receipts & Payments
        </span>
      ),
      children: (
        <Card className="min-h-96">
          <Title level={4} className="!mb-4">Payment Receipts</Title>
          {payments.length === 0 ? (
            <Alert
              type="info"
              message="No receipts found"
              description="You haven't made any payments yet."
              showIcon
            />
          ) : (
            <div className="space-y-4 gap-2">
              {bookings.map((booking) => 
                payments.map((payment) => (
                  <RecieptCard
                    key={`${booking._id}-${payment._id}`}
                    title={`Receipt For Therapy Session`}
                    link={payment?.receipt_pdf}
                    date={`${booking?.services?.[0]?.date || 'N/A'} ${booking?.services?.[0]?.time || ''}`}
                    amount={payment?.amount}
                    paymentMethod={payment?.payment_method}
                  />
                ))
              )}
            </div>
          )}
        </Card>
      ),
    },
    {
      key: 'profile',
      label: (
        <span className='flex gap-2'>
          <UserOutlined />
          Profile Information
        </span>
      ),
      children: (
        <Card 
          className="min-h-96"
          title="Profile Information"
          extra={
            !editMode ? (
              <Button 
                type="primary" 
                icon={<EditOutlined />}
                onClick={() => {
                  setEditMode(true)
                  form.setFieldsValue({
                    firstName: user?.firstName || user?.first_name || '',
                    lastName: user?.lastName || user?.last_name || '',
                    email: user?.email || '',
                    phone: user?.phone || '',
                    gender: user?.gender || '',
                    age: user?.age || '',
                  })
                }}
                className="bg-[#eab308] hover:bg-[#ca8a04] border-[#eab308] hover:border-[#ca8a04]"
              >
                Edit Profile
              </Button>
            ) : (
              <Space>
                <Button 
                  type="primary" 
                  icon={<SaveOutlined />}
                  loading={updating}
                  onClick={() => form.submit()}
                  className="bg-[#eab308] hover:bg-[#ca8a04] border-[#eab308] hover:border-[#ca8a04]"
                >
                  Save
                </Button>
                <Button 
                  icon={<CloseOutlined />}
                  onClick={() => {
                    setEditMode(false)
                    form.resetFields()
                  }}
                >
                  Cancel
                </Button>
              </Space>
            )
          }
        >
          {editMode ? (
            <Form
              form={form}
              layout="vertical"
              onFinish={handleUpdateProfile}
              className="max-w-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true, message: 'Please enter your first name' }]}
                >
                  <Input placeholder="Enter your first name" />
                </Form.Item>

                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: 'Please enter your last name' }]}
                >
                  <Input placeholder="Enter your last name" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                  label="Phone Number"
                  name="phone"
                >
                  <Input placeholder="Enter your phone number" />
                </Form.Item>

                <Form.Item
                  label="Gender"
                  name="gender"
                >
                  <Select placeholder="Select your gender">
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                    <Option value="Other">Other</Option>
                    <Option value="Prefer not to say">Prefer not to say</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Age"
                  name="age"
                >
                  <Input type="number" placeholder="Enter your age" min="1" max="120" />
                </Form.Item>
              </div>
            </Form>
          ) : (
            <Descriptions column={1} className="max-w-2xl">
              <Descriptions.Item label="First Name">
                {user?.firstName || user?.first_name || 'Not provided'}
              </Descriptions.Item>
              <Descriptions.Item label="Last Name">
                {user?.lastName || user?.last_name || 'Not provided'}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {user?.email || 'Not provided'}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                {user?.phone || 'Not provided'}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {user?.gender || 'Not provided'}
              </Descriptions.Item>
              <Descriptions.Item label="Age">
                {user?.age || 'Not provided'}
              </Descriptions.Item>
              <Descriptions.Item label="Member Since">
                {formatDate(user?.createdAt)}
              </Descriptions.Item>
              <Descriptions.Item label="Account Status">
                <span className="text-green-600 font-medium">Active</span>
              </Descriptions.Item>
            </Descriptions>
          )}
        </Card>
      ),
    },
    {
      key: 'settings',
      label: (
        <span className='flex gap-2'>
          <SettingOutlined />
          Account Settings
        </span>
      ),
      children: (
        <Card className="min-h-96">
          <div className="max-w-2xl">
            <Title level={4} className="!text-red-600 !mb-2">Danger Zone</Title>
            <Text className="text-gray-600 block mb-6">
              Once you delete your account, there is no going back. Please be certain.
            </Text>
            
            <Alert
              type="warning"
              message="Account Deletion"
              description="Deleting your account will permanently remove all your data, including session history, payments, and personal information. This action cannot be undone."
              className="mb-6"
              showIcon
            />

            <Popconfirm
              title="Delete Account"
              description="Are you sure you want to delete your account? This action cannot be undone."
              onConfirm={handleDeleteAccount}
              okText="Yes, Delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
            >
              <Button danger type="primary" size="large">
                Delete Account
              </Button>
            </Popconfirm>
          </div>
        </Card>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero title="Your Account" description="Manage all your sessions and account information" />
      
      <div className="container mx-auto px-4 py-8">
        {error && (
          <Alert
            type="error"
            message="Error Loading Account Data"
            description={error}
            className="mb-6"
            action={
              <Button size="small" onClick={fetchUserData}>
                Retry
              </Button>
            }
            showIcon
            closable
            onClose={() => setError(null)}
          />
        )}

        {/* Welcome Section */}
        <Card className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-[#eab308] rounded-full flex items-center justify-center">
              <UserOutlined className="text-2xl text-white" />
            </div>
            <div>
              <Title level={3} className="!mb-1">
                Welcome back, {user?.firstName || user?.first_name || 'User'}!
              </Title>
              <Text className="text-gray-600">
                Manage your therapy sessions and account settings
              </Text>
            </div>
          </div>
        </Card>

        {/* Main Content Tabs */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          className="bg-white rounded-lg px-4"
        />
      </div>
    </div>
  )
}