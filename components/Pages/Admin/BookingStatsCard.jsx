import React from 'react'
import { Card, Statistic, Row, Col, Progress } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'

export default function BookingStatsCard({ 
    completedBookings, 
    pendingBookings, 
    totalBookings 
}) {
    const completedPercent = totalBookings > 0 ? 
        Math.round(completedBookings / totalBookings * 100) : 0
    const pendingPercent = totalBookings > 0 ? 
        Math.round(pendingBookings / totalBookings * 100) : 0

    return (
        <Card title="Booking Status" extra={<CalendarOutlined />} className="h-full">
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic
                        title="Completed"
                        value={completedBookings}
                        valueStyle={{ color: '#52c41a' }}
                    />
                    <Progress 
                        percent={completedPercent} 
                        strokeColor="#52c41a" 
                        size="small"
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title="Pending"
                        value={pendingBookings}
                        valueStyle={{ color: '#faad14' }}
                    />
                    <Progress 
                        percent={pendingPercent} 
                        strokeColor="#faad14" 
                        size="small"
                    />
                </Col>
            </Row>
        </Card>
    )
}
