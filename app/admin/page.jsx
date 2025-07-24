'use client'

import WebsiteControls from '@/components/Pages/Admin/WebsiteControls'
import { useAuth } from '@/context/AuthContext'
import { Button, Upload, message, Card, Statistic, Row, Col, Progress, Timeline, List, Avatar } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BsDownload } from 'react-icons/bs'
import { 
    UserOutlined, 
    ShoppingOutlined, 
    CalendarOutlined, 
    DollarOutlined,
    TrendingUpOutlined,
    TeamOutlined,
    ClockCircleOutlined,
    FileTextOutlined,
    CrownOutlined
} from '@ant-design/icons'
import Widgets from './Widgets'
import Sessions from './Sessions'
import UserList from './UserList'
import PaymentsList from './PaymentsList'
import SimpleLoading from '@/components/Constants/Loading/SimpleLoading'
import SimpleRedirect from '@/components/Constants/Loading/SimpleRedirect'
import { userAPI, serviceAPI, blogAPI, bookingAPI, paymentAPI } from '@/utils/api'

export default function page() {
    
    const { user, isAuthenticated, loading } = useAuth()
    const router = useRouter()
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, []);

    useEffect(() => {
        if(!user){
            router.push("/")
        }
    }, [user])
    
    const [refresh, setRefresh] = useState(false);
    
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [payments, setPayments] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (user && user.role === 'Admin') {
                try {
                    setDataLoading(true);
                    
                    const [usersData, servicesData, blogsData, bookingsData, paymentsData] = await Promise.allSettled([
                        userAPI.getAll(),
                        serviceAPI.getAll(), 
                        blogAPI.getAll(),
                        bookingAPI.getAll(),
                        paymentAPI.getAll()
                    ]);
                    
                    setUsers(usersData.status === 'fulfilled' ? usersData.value?.data || [] : []);
                    setServices(servicesData.status === 'fulfilled' ? servicesData.value?.data || [] : []);
                    setBlogs(blogsData.status === 'fulfilled' ? blogsData.value?.data || [] : []);
                    setBookings(bookingsData.status === 'fulfilled' ? bookingsData.value?.data || [] : []);
                    setPayments(paymentsData.status === 'fulfilled' ? paymentsData.value?.data || [] : []);
                    
                } catch (error) {
                    console.error('Error fetching admin data:', error);
                    message.error('Failed to load admin data');
                } finally {
                    setDataLoading(false);
                }
            } else {
                setDataLoading(false);
            }
        };
        
        fetchData();
    }, [refresh, user]);

    
    // Calculate dashboard metrics
    const dashboardStats = {
        totalUsers: users?.length || 0,
        totalServices: services?.length || 0,
        totalBookings: bookings?.length || 0,
        totalPayments: payments?.length || 0,
        totalRevenue: payments?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0,
        completedBookings: bookings?.filter(booking => booking.status === 'completed')?.length || 0,
        pendingBookings: bookings?.filter(booking => booking.status === 'pending')?.length || 0,
        recentUsers: users?.slice(-5)?.reverse() || [],
        recentBookings: bookings?.slice(-5)?.reverse() || [],
    };
    
    if (!hasMounted) return (<SimpleLoading />)

    if (loading) {
        return <SimpleLoading />;
    }
    
    if (!user) {
        router.push('/auth/signin');
        return <SimpleRedirect />
    }
    
    if (user.role !== "Admin") {
        router.push('/');
        return <SimpleRedirect />
    } 
    
    if (dataLoading) {
        return (
            <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
                <div className='text-center'>
                    <SimpleLoading />
                    <p className='mt-4 text-gray-600'>Loading admin dashboard...</p>
                </div>
            </div>
        );
    } else {
    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Header */}
            <div className='bg-white shadow-sm border-b'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex justify-between items-center py-6'>
                        <div>
                            <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
                                <CrownOutlined className='text-yellow-500' />
                                Admin Dashboard
                            </h1>
                            <p className='text-gray-600 mt-1'>Welcome back, {user?.first_name}</p>
                        </div>
                        <div className='flex items-center space-x-4'>
                            <div className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium'>
                                Admin Access
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Top Stats Cards */}
                <Row gutter={[16, 16]} className='mb-8'>
                    <Col xs={24} sm={12} lg={6}>
                        <Card>
                            <Statistic
                                title="Total Users"
                                value={dashboardStats.totalUsers}
                                prefix={<UserOutlined />}
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card>
                            <Statistic
                                title="Total Services"
                                value={dashboardStats.totalServices}
                                prefix={<ShoppingOutlined />}
                                valueStyle={{ color: '#cf1322' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card>
                            <Statistic
                                title="Total Bookings"
                                value={dashboardStats.totalBookings}
                                prefix={<CalendarOutlined />}
                                valueStyle={{ color: '#1890ff' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card>
                            <Statistic
                                title="Total Revenue"
                                value={dashboardStats.totalRevenue}
                                prefix={<DollarOutlined />}
                                precision={2}
                                valueStyle={{ color: '#722ed1' }}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Secondary Stats */}
                <Row gutter={[16, 16]} className='mb-8'>
                    <Col xs={24} lg={12}>
                        <Card title="Booking Status" extra={<CalendarOutlined />}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic
                                        title="Completed"
                                        value={dashboardStats.completedBookings}
                                        valueStyle={{ color: '#52c41a' }}
                                    />
                                    <Progress 
                                        percent={dashboardStats.totalBookings > 0 ? 
                                            (dashboardStats.completedBookings / dashboardStats.totalBookings * 100) : 0} 
                                        strokeColor="#52c41a" 
                                        size="small"
                                    />
                                </Col>
                                <Col span={12}>
                                    <Statistic
                                        title="Pending"
                                        value={dashboardStats.pendingBookings}
                                        valueStyle={{ color: '#faad14' }}
                                    />
                                    <Progress 
                                        percent={dashboardStats.totalBookings > 0 ? 
                                            (dashboardStats.pendingBookings / dashboardStats.totalBookings * 100) : 0} 
                                        strokeColor="#faad14" 
                                        size="small"
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Card title="Total Blogs" extra={<FileTextOutlined />}>
                            <Statistic
                                title="Published Articles"
                                value={blogs?.length || 0}
                                prefix={<FileTextOutlined />}
                                valueStyle={{ color: '#1890ff' }}
                            />
                            <div className='mt-4'>
                                <div className='text-sm text-gray-500'>Content Management</div>
                                <Progress 
                                    percent={75} 
                                    strokeColor="#1890ff" 
                                    format={(percent) => `${percent}% Active`}
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* Activity Overview */}
                <Row gutter={[16, 16]} className='mb-8'>
                    <Col xs={24} lg={12}>
                        <Card title="Recent Users" extra={<TeamOutlined />}>
                            <List
                                itemLayout="horizontal"
                                dataSource={dashboardStats.recentUsers}
                                renderItem={(user) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar icon={<UserOutlined />} />}
                                            title={`${user.first_name} ${user.last_name}`}
                                            description={user.email}
                                        />
                                        <div className='text-right'>
                                            <div className={`px-2 py-1 rounded text-xs ${
                                                user.role === 'Admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {user.role}
                                            </div>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Card title="Recent Bookings" extra={<ClockCircleOutlined />}>
                            <Timeline
                                items={dashboardStats.recentBookings.slice(0, 5).map((booking, index) => ({
                                    color: booking.status === 'completed' ? 'green' : 'blue',
                                    children: (
                                        <div key={index}>
                                            <div className='font-medium'>{booking.service_name || 'Service'}</div>
                                            <div className='text-sm text-gray-500'>
                                                {booking.user_email} • {new Date(booking.created_at).toLocaleDateString()}
                                            </div>
                                            <div className={`inline-block px-2 py-1 rounded text-xs mt-1 ${
                                                booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                                {booking.status}
                                            </div>
                                        </div>
                                    )
                                }))}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Management Sections */}
                <div className='space-y-6'>
                    {/* Website Controls */}
                    <Card title="Website Management" extra={<ShoppingOutlined />}>
                        <WebsiteControls services={services} blogs={blogs} setRefresh={setRefresh}/>
                    </Card>

                    {/* Sessions Management */}
                    <Card title="Sessions Management" extra={<CalendarOutlined />}>
                        <Sessions bookings={bookings}/>
                    </Card>

                    {/* Users Management */}
                    <Card title="Users Management" extra={<UserOutlined />}>
                        <UserList users={users}/>
                    </Card>

                    {/* Payments Management */}
                    <Card title="Payments Management" extra={<DollarOutlined />}>
                        <PaymentsList payments={payments}/>
                    </Card>
                </div>
            </div>
        </div>
    )
  }
}
