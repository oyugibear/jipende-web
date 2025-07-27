import React, { useState, useMemo } from 'react'
import { Table, Input, Tag, Button, Space, Card, Avatar } from 'antd'
import { SearchOutlined, EyeOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons'
import Link from 'next/link'

const { Search } = Input

export default function Sessions({ bookings }) {
  const [searchText, setSearchText] = useState('')

  // Filter bookings based on search text
  const filteredBookings = useMemo(() => {
    if (!searchText) return bookings

    return bookings.filter(booking => {
      const clientName = `${booking.postedBy?.first_name || ''} ${booking.postedBy?.second_name || ''}`.toLowerCase()
      const service = booking.services?.[0]?.title?.toLowerCase() || ''
      const status = booking.status?.toLowerCase() || 'pending'
      const paymentStatus = booking.paymentInfo?.payment_status?.toLowerCase() || ''
      
      return clientName.includes(searchText.toLowerCase()) ||
             service.includes(searchText.toLowerCase()) ||
             status.includes(searchText.toLowerCase()) ||
             paymentStatus.includes(searchText.toLowerCase())
    })
  }, [bookings, searchText])

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'success'
      case 'confirmed': return 'processing'
      case 'rescheduled': return 'warning'
      case 'cancelled': return 'error'
      default: return 'default'
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid': return 'success'
      case 'pending': return 'warning'
      case 'failed': return 'error'
      default: return 'default'
    }
  }

  console.log("`filteredBookings`", filteredBookings)

  const columns = [
    {
      title: 'Client',
      dataIndex: 'postedBy',
      key: 'postedBy',
      render: (postedBy) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div className="font-medium">
              {postedBy?.first_name} {postedBy?.second_name}
            </div>
            <div className="text-xs text-gray-500">
              {postedBy?.email}
            </div>
          </div>
        </Space>
      ),
      sorter: (a, b) => {
        const nameA = `${a.postedBy?.first_name || ''} ${a.postedBy?.second_name || ''}`
        const nameB = `${b.postedBy?.first_name || ''} ${b.postedBy?.second_name || ''}`
        return nameA.localeCompare(nameB)
      }
    },
    {
      title: 'Service',
      dataIndex: 'services',
      key: 'service',
      render: (services) => (
        <div>
          <div className="font-medium">{services?.[0]?.title || 'N/A'}</div>
          <div className="text-xs text-gray-500">{services?.[0]?.category}</div>
        </div>
      )
    },
    {
      title: 'Schedule',
      dataIndex: 'services',
      key: 'schedule',
      render: (services) => (
        <Space direction="vertical" size="small">
          <div className="flex items-center gap-1">
            <CalendarOutlined className="text-gray-400" />
            <span className="text-sm">{services?.[0]?.date || 'Not set'}</span>
          </div>
          <div className="text-xs text-gray-500">
            {services?.[0]?.time || 'Time TBD'}
          </div>
        </Space>
      ),
      sorter: (a, b) => new Date(a.services?.[0]?.date || 0) - new Date(b.services?.[0]?.date || 0)
    },
    {
      title: 'Amount',
      dataIndex: 'services',
      key: 'amount',
      render: (services) => (
        <div className="font-medium text-green-600">
          KSH {services?.[0]?.price || '0'}
        </div>
      ),
      sorter: (a, b) => (parseFloat(a.services?.[0]?.price || 0) - parseFloat(b.services?.[0]?.price || 0))
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentInfo',
      key: 'paymentStatus',
      render: (paymentInfo) => (
        <Tag color={getPaymentStatusColor(paymentInfo?.payment_status)}>
          {(paymentInfo?.payment_status || 'pending').toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Paid', value: 'paid' },
        { text: 'Pending', value: 'pending' },
        { text: 'Failed', value: 'failed' }
      ],
      onFilter: (value, record) => 
        (record.paymentInfo?.payment_status || 'pending').toLowerCase() === value
    },
    {
      title: 'Booking Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {(status || 'pending').toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Completed', value: 'completed' },
        { text: 'Confirmed', value: 'confirmed' },
        { text: 'Rescheduled', value: 'rescheduled' },
        { text: 'Cancelled', value: 'cancelled' },
        { text: 'Pending', value: 'pending' }
      ],
      onFilter: (value, record) => 
        (record.status || 'pending').toLowerCase() === value
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Link href={`/admin/bookings/${record?._id}`}>
          <Button 
            type="primary" 
            icon={<EyeOutlined />}
            size="small"
            className="bg-yellow-500 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600"
          >
            View
          </Button>
        </Link>
      )
    }
  ]

  return (
    <div className="">
      <Card className="shadow-sm">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Management</h2>
              <p className="text-gray-600">Manage all therapy sessions and bookings</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Total Sessions</div>
              <div className="text-2xl font-bold text-yellow-600">{bookings?.length || 0}</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Search
              placeholder="Search by client name, service, or status..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              className="max-w-md"
              onChange={(e) => setSearchText(e.target.value)}
              style={{ maxWidth: 400 }}
            />
            <div className="text-sm text-gray-500">
              Showing {filteredBookings?.length || 0} of {bookings?.length || 0} sessions
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={[...filteredBookings].reverse()}
          rowKey="_id"
          pagination={{
            total: filteredBookings?.length || 0,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} sessions`,
            className: "mt-4"
          }}
          scroll={{ x: 1000 }}
          className="custom-table"
          size="middle"
          rowClassName="hover:bg-gray-50"
        />
      </Card>
    </div>
  )
}
