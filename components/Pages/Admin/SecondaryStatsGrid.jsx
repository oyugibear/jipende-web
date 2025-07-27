import React from 'react'
import { Row, Col } from 'antd'
import BookingStatsCard from './BookingStatsCard'
import BlogStatsCard from './BlogStatsCard'

export default function SecondaryStatsGrid({ dashboardStats, totalBlogs }) {
    return (
        <Row gutter={[16, 16]} className='mb-8'>
            <Col xs={24} lg={12}>
                <BookingStatsCard
                    completedBookings={dashboardStats.completedBookings}
                    pendingBookings={dashboardStats.pendingBookings}
                    totalBookings={dashboardStats.totalBookings}
                />
            </Col>
            <Col xs={24} lg={12}>
                <BlogStatsCard totalBlogs={totalBlogs} />
            </Col>
        </Row>
    )
}
