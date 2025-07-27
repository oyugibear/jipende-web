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
import TopStatsGrid from '@/components/Pages/Admin/TopStatsGrid'
import SecondaryStatsGrid from '@/components/Pages/Admin/SecondaryStatsGrid'
import ActivityOverviewGrid from '@/components/Pages/Admin/ActivityOverviewGrid'

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
        totalRevenue: payments?.reduce((sum, payment) => sum + (payment.final_amount_invoiced || 0), 0) || 0,
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
                    <div className='flex justify-between items-center py-6 text-sm'>
                        <div>
                            <h1 className='text-md font-bold text-gray-900 flex items-center gap-3'>
                                <CrownOutlined className='text-yellow-500' />
                                Admin Dashboard
                            </h1>
                            <p className='text-gray-600 mt-1'>Welcome back, {user?.first_name}</p>
                        </div>
                        <div className='flex items-center space-x-4'>
                            <div className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm'>
                                Admin Access
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Top Stats Cards */}
                <TopStatsGrid dashboardStats={dashboardStats} />

                {/* Secondary Stats */}
                <SecondaryStatsGrid 
                    dashboardStats={dashboardStats} 
                    totalBlogs={blogs?.length || 0} 
                />

                {/* Activity Overview */}
                <ActivityOverviewGrid dashboardStats={dashboardStats} />

                {/* Management Sections */}
                <div className='space-y-6'>
                    {/* Website Controls */}
                    <Card title="Website Management" extra={<ShoppingOutlined />}>
                        <WebsiteControls services={services} blogs={blogs} setRefresh={setRefresh}/>
                    </Card>

                    {/* Booking Management */}
                    <Card title="Booking Management" extra={<CalendarOutlined />}>
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
