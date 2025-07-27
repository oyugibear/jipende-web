'use client'

import React, { useState, useMemo } from 'react'
import { Input, Pagination, Select, Empty, Table, Tag, Button } from 'antd'
import { PiUser, PiMagnifyingGlass, PiFunnel, PiEye } from 'react-icons/pi'
import Link from 'next/link'

const { Search } = Input
const { Option } = Select

export default function UserList({ users }) {
    const userData = users || []
    
    // State for search, pagination, and filtering
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(12)
    const [roleFilter, setRoleFilter] = useState('all')

    // Filter and search users
    const filteredUsers = useMemo(() => {
        return userData.filter(user => {
            const matchesSearch = searchTerm === '' || 
                (user?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 user?.second_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 user?.phone_number?.includes(searchTerm))

            const matchesRole = roleFilter === 'all' || user?.role === roleFilter

            return matchesSearch && matchesRole
        })
    }, [userData, searchTerm, roleFilter])

    // Calculate pagination
    const totalUsers = filteredUsers.length
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const currentUsers = filteredUsers.slice(startIndex, endIndex)

    // Handle search
    const handleSearch = (value) => {
        setSearchTerm(value)
        setCurrentPage(1) // Reset to first page when searching
    }

    // Handle role filter
    const handleRoleFilter = (value) => {
        setRoleFilter(value)
        setCurrentPage(1) // Reset to first page when filtering
    }

    // Handle page change
    const handlePageChange = (page, size) => {
        setCurrentPage(page)
        if (size !== pageSize) {
            setPageSize(size)
        }
    }

    // Get unique roles for filter dropdown
    const availableRoles = useMemo(() => {
        const roles = [...new Set(userData.map(user => user?.role).filter(Boolean))]
        return roles
    }, [userData])

    // Table columns configuration
    const columns = [
        {
            title: 'User',
            dataIndex: 'name',
            key: 'name',
            render: (_, user) => (
                <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                        <PiUser size={16} className='text-blue-600' />
                    </div>
                    <div>
                        <div className='font-medium text-gray-900'>
                            {`${user?.first_name || ''} ${user?.second_name || ''}`.trim() || 'Unknown User'}
                        </div>
                        <div className='text-sm text-gray-500'>{user?.email || 'No email'}</div>
                    </div>
                </div>
            ),
            sorter: (a, b) => {
                const nameA = `${a?.first_name || ''} ${a?.second_name || ''}`.trim().toLowerCase()
                const nameB = `${b?.first_name || ''} ${b?.second_name || ''}`.trim().toLowerCase()
                return nameA.localeCompare(nameB)
            },
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => (
                <Tag 
                    color={
                        role === 'admin' ? 'red' :
                        role === 'user' ? 'blue' : 'default'
                    }
                    className='capitalize'
                >
                    {role || 'Unknown'}
                </Tag>
            ),
            filters: availableRoles.map(role => ({
                text: role.charAt(0).toUpperCase() + role.slice(1),
                value: role,
            })),
            onFilter: (value, record) => record.role === value,
            sorter: (a, b) => (a.role || '').localeCompare(b.role || ''),
        },
        {
            title: 'Phone',
            dataIndex: 'phone_number',
            key: 'phone',
            render: (phone) => phone || 'No phone',
        },
        {
            title: 'Profile Status',
            dataIndex: 'profile_status',
            key: 'profile_status',
            render: (status) => (
                <span className='text-sm text-gray-600'>
                    {status || 'Profile not started'}
                </span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, user) => (
                <Link href={`/admin/users/${user._id}`}>
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

    if (!userData || userData.length === 0) {
        return (
            <div className='flex flex-col items-center w-full py-12'>
                <div className="text-center max-w-md">
                    <div className="bg-gray-50 rounded-full p-6 mb-6 mx-auto w-fit">
                        <PiUser size={48} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Users Found</h3>
                    <p className="text-gray-600">There are currently no users in the system.</p>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center w-full py-8'>
            {/* Header */}
            <div className='flex flex-col items-center mb-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>User Management</h2>
                <p className='text-gray-600'>Manage and view all system users ({totalUsers} total)</p>
            </div>

            {/* Search and Filter Controls */}
            <div className='w-full max-w-[1240px] mb-6'>
                <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
                    {/* Search */}
                    <div className='flex items-center gap-4 flex-1'>
                        <Search
                            placeholder="Search users by name, email, or phone..."
                            allowClear
                            enterButton={<PiMagnifyingGlass size={16} />}
                            size="large"
                            onSearch={handleSearch}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-md"
                        />
                        
                        {/* Role Filter */}
                        <Select
                            value={roleFilter}
                            onChange={handleRoleFilter}
                            size="large"
                            className="min-w-[120px]"
                            suffixIcon={<PiFunnel size={16} />}
                        >
                            <Option value="all">All Roles</Option>
                            {availableRoles.map(role => (
                                <Option key={role} value={role}>
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                </Option>
                            ))}
                        </Select>
                    </div>

                    {/* Results Info */}
                    <div className='text-sm text-gray-600'>
                        Showing {Math.min(startIndex + 1, totalUsers)}-{Math.min(endIndex, totalUsers)} of {totalUsers} users
                    </div>
                </div>
            </div>

            {/* Users Grid */}
            {currentUsers.length > 0 ? (
                <div className='w-full max-w-[1240px] mb-8'>
                    <Table
                        columns={columns}
                        dataSource={currentUsers}
                        pagination={false}
                        rowKey="_id"
                        size="middle"
                        scroll={{ x: 800 }}
                        className="user-table"
                    />
                </div>
            ) : (
                <div className='w-full max-w-[1240px] mb-8'>
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={
                            <div>
                                <p className="text-gray-600 mb-2">No users found</p>
                                <p className="text-sm text-gray-500">
                                    {searchTerm || roleFilter !== 'all' 
                                        ? 'Try adjusting your search or filters' 
                                        : 'No users match your criteria'
                                    }
                                </p>
                            </div>
                        }
                    />
                </div>
            )}

            {/* Pagination */}
            {totalUsers > pageSize && (
                <div className='w-full max-w-[1240px] flex justify-center'>
                    <Pagination
                        current={currentPage}
                        total={totalUsers}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                        showSizeChanger
                        showQuickJumper
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} users`}
                        pageSizeOptions={['6', '12', '24', '48']}
                        className="pagination-custom"
                    />
                </div>
            )}
        </div>
    )
}
