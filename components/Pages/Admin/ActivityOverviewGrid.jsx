import React from 'react'
import { Row, Col } from 'antd'
import RecentUsersCard from './RecentUsersCard'
import RecentBookingsCard from './RecentBookingsCard'

export default function ActivityOverviewGrid({ dashboardStats }) {
    return (
        <Row gutter={[16, 16]} className='mb-8'>
            <Col xs={24} lg={12}>
                <RecentUsersCard recentUsers={dashboardStats.recentUsers} />
            </Col>
            <Col xs={24} lg={12}>
                <RecentBookingsCard recentBookings={dashboardStats.recentBookings} />
            </Col>
        </Row>
    )
}
