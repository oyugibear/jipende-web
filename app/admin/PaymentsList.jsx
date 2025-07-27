'use client'

import Link from 'next/link'
import React, { useState, useMemo } from 'react'
import { Table, Tag, Button, Pagination, Input, Select, Empty } from 'antd'
import { PiCurrencyDollar, PiUser, PiCalendar, PiCreditCard, PiCheckCircle, PiXCircle, PiClock, PiEye, PiMagnifyingGlass, PiFunnel } from 'react-icons/pi'
import dayjs from 'dayjs'

const { Search } = Input
const { Option } = Select

export default function PaymentsList({payments}) {
    const paymentData = payments || []
    
    // State for search, pagination, and filtering
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [statusFilter, setStatusFilter] = useState('all')

    // Filter and search payments
    const filteredPayments = useMemo(() => {
        return paymentData.filter(payment => {
            const clientName = `${payment?.postedBy?.first_name || ''} ${payment?.postedBy?.second_name || ''}`.trim()
            const matchesSearch = searchTerm === '' || 
                (clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 payment?.payment_method?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 payment?.final_amount_invoiced?.toString().includes(searchTerm))

            const matchesStatus = statusFilter === 'all' || payment?.payment_status === statusFilter

            return matchesSearch && matchesStatus
        })
    }, [paymentData, searchTerm, statusFilter])

    // Calculate pagination
    const totalPayments = filteredPayments.length
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const currentPayments = filteredPayments.slice(startIndex, endIndex)

    // Handle search
    const handleSearch = (value) => {
        setSearchTerm(value)
        setCurrentPage(1) // Reset to first page when searching
    }

    // Handle status filter
    const handleStatusFilter = (value) => {
        setStatusFilter(value)
        setCurrentPage(1) // Reset to first page when filtering
    }

    // Handle page change
    const handlePageChange = (page, size) => {
        setCurrentPage(page)
        if (size !== pageSize) {
            setPageSize(size)
        }
    }

    // Get unique statuses for filter dropdown
    const availableStatuses = useMemo(() => {
        const statuses = [...new Set(paymentData.map(payment => payment?.payment_status).filter(Boolean))]
        return statuses
    }, [paymentData])

    // Table columns configuration
    const columns = [
        {
            title: 'Amount',
            dataIndex: 'final_amount_invoiced',
            key: 'amount',
            render: (amount, payment) => (
                <div className='flex items-center gap-2'>
                    <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                        <PiCurrencyDollar size={16} className='text-green-600' />
                    </div>
                    <div>
                        <div className='font-semibold text-gray-900'>
                            {payment?.currency || 'KSH'} {amount || '0'}
                        </div>
                    </div>
                </div>
            ),
            sorter: (a, b) => (a.final_amount_invoiced || 0) - (b.final_amount_invoiced || 0),
        },
        {
            title: 'Client',
            dataIndex: 'postedBy',
            key: 'client',
            render: (postedBy) => (
                <div className='flex items-center gap-2'>
                    <PiUser size={16} className='text-gray-400' />
                    <span className='text-gray-900'>
                        {`${postedBy?.first_name || ''} ${postedBy?.second_name || ''}`.trim() || 'Unknown Client'}
                    </span>
                </div>
            ),
            sorter: (a, b) => {
                const nameA = `${a?.postedBy?.first_name || ''} ${a?.postedBy?.second_name || ''}`.trim().toLowerCase()
                const nameB = `${b?.postedBy?.first_name || ''} ${b?.postedBy?.second_name || ''}`.trim().toLowerCase()
                return nameA.localeCompare(nameB)
            },
        },
        {
            title: 'Status',
            dataIndex: 'payment_status',
            key: 'status',
            render: (status) => {
                let color = 'default'
                
                if (status === 'completed' || status === 'success') {
                    color = 'success'
                } else if (status === 'pending') {
                    color = 'warning'
                } else if (status === 'failed' || status === 'cancelled') {
                    color = 'error'
                }
                
                return (
                    <Tag color={color} className='capitalize'>
                        {status || 'Unknown'}
                    </Tag>
                )
            },
            filters: availableStatuses.map(status => ({
                text: status.charAt(0).toUpperCase() + status.slice(1),
                value: status,
            })),
            onFilter: (value, record) => record.payment_status === value,
            sorter: (a, b) => (a.payment_status || '').localeCompare(b.payment_status || ''),
        },
        {
            title: 'Payment Method',
            dataIndex: 'payment_method',
            key: 'method',
            render: (method) => (
                <div className='flex items-center gap-2'>
                    <PiCreditCard size={16} className='text-gray-400' />
                    <span className='text-gray-600'>{method || 'Not specified'}</span>
                </div>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'payment_date',
            key: 'date',
            render: (date) => (
                <div className='flex items-center gap-2'>
                    <PiCalendar size={16} className='text-gray-400' />
                    <span className='text-gray-600'>
                        {date ? dayjs(date).format('MMM D, YYYY') : 'No date'}
                    </span>
                </div>
            ),
            sorter: (a, b) => {
                const dateA = a.payment_date ? new Date(a.payment_date) : new Date(0)
                const dateB = b.payment_date ? new Date(b.payment_date) : new Date(0)
                return dateA - dateB
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, payment) => (
                <Link href={`/admin/payments/${payment._id}`}>
                    <Button 
                        type="primary" 
                        size="small"
                        icon={<PiEye size={14} />}
                        className='bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600'
                    >
                        View
                    </Button>
                </Link>
            ),
        },
    ]

    if (!paymentData || paymentData.length === 0) {
        return (
            <div className='flex flex-col items-center w-full py-12'>
                <div className="text-center max-w-md">
                    <div className="bg-gray-50 rounded-full p-6 mb-6 mx-auto w-fit">
                        <PiCurrencyDollar size={48} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Payments Found</h3>
                    <p className="text-gray-600">There are currently no payment records in the system.</p>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center w-full py-8'>
            {/* Header */}
            <div className='flex flex-col items-center mb-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>Payment Management</h2>
                <p className='text-gray-600'>Track and manage all payment transactions ({totalPayments} total)</p>
            </div>

            {/* Search and Filter Controls */}
            <div className='w-full max-w-[1240px] mb-6'>
                <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
                    {/* Search */}
                    <div className='flex items-center gap-4 flex-1'>
                        <Search
                            placeholder="Search payments by client, method, or amount..."
                            allowClear
                            enterButton={<PiMagnifyingGlass size={16} />}
                            size="large"
                            onSearch={handleSearch}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-md"
                        />
                        
                        {/* Status Filter */}
                        <Select
                            value={statusFilter}
                            onChange={handleStatusFilter}
                            size="large"
                            className="min-w-[140px]"
                            suffixIcon={<PiFunnel size={16} />}
                        >
                            <Option value="all">All Statuses</Option>
                            {availableStatuses.map(status => (
                                <Option key={status} value={status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </Option>
                            ))}
                        </Select>
                    </div>

                    {/* Results Info */}
                    <div className='text-sm text-gray-600'>
                        Showing {Math.min(startIndex + 1, totalPayments)}-{Math.min(endIndex, totalPayments)} of {totalPayments} payments
                    </div>
                </div>
            </div>

            {/* Payments Table */}
            {currentPayments.length > 0 ? (
                <div className='w-full max-w-[1240px] mb-8'>
                    <Table
                        columns={columns}
                        dataSource={currentPayments}
                        pagination={false}
                        rowKey="_id"
                        size="middle"
                        scroll={{ x: 1000 }}
                        className="payments-table"
                    />
                </div>
            ) : (
                <div className='w-full max-w-[1240px] mb-8'>
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={
                            <div>
                                <p className="text-gray-600 mb-2">No payments found</p>
                                <p className="text-sm text-gray-500">
                                    {searchTerm || statusFilter !== 'all' 
                                        ? 'Try adjusting your search or filters' 
                                        : 'No payments match your criteria'
                                    }
                                </p>
                            </div>
                        }
                    />
                </div>
            )}

            {/* Pagination */}
            {totalPayments > pageSize && (
                <div className='w-full max-w-[1240px] flex justify-center'>
                    <Pagination
                        current={currentPage}
                        total={totalPayments}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                        showSizeChanger
                        showQuickJumper
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} payments`}
                        pageSizeOptions={['5', '10', '20', '50']}
                        className="pagination-custom"
                    />
                </div>
            )}
        </div>
    )
}
