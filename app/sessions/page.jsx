'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { Tabs, Spin, Alert, Empty, Input, Select, Space, Typography, Card, Button } from 'antd'
import { SearchOutlined, CalendarOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons'
import SessionCard from '@/components/Pages/Account/SessionCard'
import Hero from '@/components/Constants/Hero'
import { useAuth } from '@/context/AuthContext'
import { bookingAPI } from '@/utils/api'
import dayjs from 'dayjs'

const { Title } = Typography
const { Option } = Select

export default function SessionsPage() {
    const { user, isAuthenticated } = useAuth()
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeTab, setActiveTab] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [sortBy, setSortBy] = useState('date-desc')

    useEffect(() => {
        fetchBookings()
    }, [user, isAuthenticated])

    const fetchBookings = async () => {
        if (!user || !isAuthenticated) {
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            setError(null)
            const response = await bookingAPI.getUserBookings(user._id)
            if (response && response.status && response.data) {
                setBookings(Array.isArray(response.data) ? response.data : [])
            } else {
                setBookings([])
            }
        } catch (error) {
            console.error('Error fetching bookings:', error)
            setError('Failed to load sessions. Please try again later.')
            setBookings([])
        } finally {
            setLoading(false)
        }
    }

    // Process and filter bookings
    const processedSessions = useMemo(() => {
        const sessions = []
        
        bookings.forEach(booking => {
            if (booking?.services && Array.isArray(booking.services)) {
                booking.services.forEach(service => {
                    const sessionDate = dayjs(service?.date)
                    const now = dayjs()
                    
                    let status = 'upcoming'
                    if (sessionDate.isBefore(now, 'day')) status = 'completed'
                    else if (sessionDate.isSame(now, 'day')) status = 'today'
                    
                    sessions.push({
                        ...service,
                        booking,
                        status,
                        isOnline: service?.location === "Online",
                        searchText: `${service?.title || ''} ${service?.description || ''} ${booking?.therapist?.firstName || ''} ${booking?.therapist?.lastName || ''}`.toLowerCase()
                    })
                })
            }
        })
        
        return sessions
    }, [bookings])

    // Filter and sort sessions
    const filteredSessions = useMemo(() => {
        let filtered = processedSessions

        // Filter by tab (online/offline)
        if (activeTab === 'online') {
            filtered = filtered.filter(session => session.isOnline)
        } else if (activeTab === 'offline') {
            filtered = filtered.filter(session => !session.isOnline)
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(session => 
                session.searchText.includes(searchTerm.toLowerCase())
            )
        }

        // Filter by status
        if (statusFilter !== 'all') {
            filtered = filtered.filter(session => session.status === statusFilter)
        }

        // Sort sessions
        filtered.sort((a, b) => {
            const dateA = dayjs(a.date)
            const dateB = dayjs(b.date)
            
            switch (sortBy) {
                case 'date-asc':
                    return dateA.isBefore(dateB) ? -1 : 1
                case 'date-desc':
                    return dateA.isAfter(dateB) ? -1 : 1
                case 'title':
                    return (a.title || '').localeCompare(b.title || '')
                default:
                    return dateA.isAfter(dateB) ? -1 : 1
            }
        })

        return filtered
    }, [processedSessions, activeTab, searchTerm, statusFilter, sortBy])

    const sessionCounts = useMemo(() => {
        const online = processedSessions.filter(s => s.isOnline).length
        const offline = processedSessions.filter(s => !s.isOnline).length
        const upcoming = processedSessions.filter(s => s.status === 'upcoming').length
        const today = processedSessions.filter(s => s.status === 'today').length
        const completed = processedSessions.filter(s => s.status === 'completed').length
        
        return { online, offline, upcoming, today, completed, total: online + offline }
    }, [processedSessions])

    if (loading) {
        return (
            <div className="min-h-screen">
                <Hero title="Your Sessions" description="Manage and view all your therapy sessions" />
                <div className="flex justify-center items-center py-20">
                    <Spin size="large" />
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen">
                <Hero title="Your Sessions" description="Manage and view all your therapy sessions" />
                <div className="container mx-auto px-4 py-12">
                    <Alert
                        type="warning"
                        message="Authentication Required"
                        description="Please log in to view your sessions."
                        className="max-w-md mx-auto"
                        showIcon
                    />
                </div>
            </div>
        )
    }

    const tabItems = [
        {
            key: 'all',
            label: `All Sessions (${sessionCounts.total})`,
        },
        {
            key: 'online',
            label: `Online (${sessionCounts.online})`,
        },
        {
            key: 'offline',
            label: `In-Person (${sessionCounts.offline})`,
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <Hero title="Your Sessions" description="Manage and view all your therapy sessions" />
            
            <div className="container mx-auto px-4 py-8">
                {error && (
                    <Alert
                        type="error"
                        message="Error Loading Sessions"
                        description={error}
                        className="mb-6"
                        action={
                            <Button size="small" onClick={fetchBookings} icon={<ReloadOutlined />}>
                                Retry
                            </Button>
                        }
                        showIcon
                        closable
                        onClose={() => setError(null)}
                    />
                )}

                {/* Session Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card className="text-center">
                        <div className="text-2xl font-bold text-[#eab308]">{sessionCounts.total}</div>
                        <div className="text-gray-600">Total Sessions</div>
                    </Card>
                    <Card className="text-center">
                        <div className="text-2xl font-bold text-green-600">{sessionCounts.upcoming}</div>
                        <div className="text-gray-600">Upcoming</div>
                    </Card>
                    <Card className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{sessionCounts.today}</div>
                        <div className="text-gray-600">Today</div>
                    </Card>
                    <Card className="text-center">
                        <div className="text-2xl font-bold text-gray-600">{sessionCounts.completed}</div>
                        <div className="text-gray-600">Completed</div>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card className="mb-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <div className="flex flex-col sm:flex-row gap-4 flex-1">
                            <Input
                                placeholder="Search sessions..."
                                prefix={<SearchOutlined />}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="max-w-xs"
                            />
                            
                            <Select
                                value={statusFilter}
                                onChange={setStatusFilter}
                                className="min-w-32"
                                placeholder="Filter by status"
                            >
                                <Option value="all">All Status</Option>
                                <Option value="upcoming">Upcoming</Option>
                                <Option value="today">Today</Option>
                                <Option value="completed">Completed</Option>
                            </Select>

                            <Select
                                value={sortBy}
                                onChange={setSortBy}
                                className="min-w-32"
                                placeholder="Sort by"
                            >
                                <Option value="date-desc">Latest First</Option>
                                <Option value="date-asc">Oldest First</Option>
                                <Option value="title">Title A-Z</Option>
                            </Select>
                        </div>

                        <Button
                            icon={<ReloadOutlined />}
                            onClick={fetchBookings}
                            loading={loading}
                        >
                            Refresh
                        </Button>
                    </div>
                </Card>

                {/* Sessions Tabs */}
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={tabItems}
                    className="bg-white rounded-lg p-4"
                />

                {/* Sessions List */}
                <div className="mt-6">
                    {filteredSessions.length === 0 ? (
                        <Empty
                            description={
                                searchTerm || statusFilter !== 'all'
                                    ? "No sessions match your filters"
                                    : activeTab === 'online'
                                    ? "No online sessions found"
                                    : activeTab === 'offline'
                                    ? "No in-person sessions found"
                                    : "No sessions found"
                            }
                            className="py-12"
                        />
                    ) : (
                        <div className="space-y-4">
                            {filteredSessions.map((session, index) => (
                                <SessionCard
                                    key={`${session.booking._id}-${index}`}
                                    data={session}
                                    type={session.isOnline ? 'Online' : 'In-Person'}
                                    booking={session.booking}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
