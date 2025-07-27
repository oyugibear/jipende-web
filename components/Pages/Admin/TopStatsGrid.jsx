import React from 'react'
import { Row, Col } from 'antd'
import { 
    UserOutlined, 
    ShoppingOutlined, 
    CalendarOutlined, 
    DollarOutlined 
} from '@ant-design/icons'
import StatsCard from './StatsCard'

export default function TopStatsGrid({ dashboardStats }) {
    return (
        <Row gutter={[16, 16]} className='mb-8'>
            <Col xs={24} sm={12} lg={6}>
                <StatsCard
                    title="Total Users"
                    value={dashboardStats.totalUsers}
                    prefix={<UserOutlined />}
                    valueStyle={{ color: '#3f8600' }}
                />
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <StatsCard
                    title="Total Services"
                    value={dashboardStats.totalServices}
                    prefix={<ShoppingOutlined />}
                    valueStyle={{ color: '#cf1322' }}
                />
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <StatsCard
                    title="Total Bookings"
                    value={dashboardStats.totalBookings}
                    prefix={<CalendarOutlined />}
                    valueStyle={{ color: '#1890ff' }}
                />
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <StatsCard
                    title="Total Revenue"
                    value={dashboardStats.totalRevenue}
                    prefix={<DollarOutlined />}
                    precision={2}
                    valueStyle={{ color: '#722ed1' }}
                />
            </Col>
        </Row>
    )
}
