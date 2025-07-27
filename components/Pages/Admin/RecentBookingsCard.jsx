import React from 'react'
import { Card, Timeline, Empty } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'

export default function RecentBookingsCard({ recentBookings }) {
    // Handle empty bookings
    if (!recentBookings || recentBookings.length === 0) {
        return (
            <Card title="Recent Bookings" extra={<ClockCircleOutlined />} className="h-full">
                <Empty 
                    description="No recent bookings"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            </Card>
        )
    }

    return (
        <Card title="Recent Bookings" extra={<ClockCircleOutlined />} className="h-full">
            <Timeline
                items={recentBookings.slice(0, 5).map((booking, index) => {
                    // Get the first service from the services array
                    const service = booking.services?.[0]
                    const serviceName = service?.title || 'Unknown Service'
                    const userEmail = booking.postedBy?.email || 'Unknown User'
                    const userName = `${booking.postedBy?.first_name || ''} ${booking.postedBy?.second_name || ''}`.trim()
                    const paymentStatus = booking.paymentInfo?.payment_status || 'pending'
                    const createdDate = new Date(booking.createdAt).toLocaleDateString()
                    const serviceDate = service?.date ? new Date(service.date).toLocaleDateString() : null
                    const serviceTime = service?.time || null

                    // Determine status color
                    let statusColor = 'blue'
                    if (paymentStatus === 'paid') statusColor = 'green'
                    else if (paymentStatus === 'failed') statusColor = 'red'
                    else if (paymentStatus === 'pending') statusColor = 'orange'

                    return {
                        color: statusColor,
                        children: (
                            <div key={booking._id || index}>
                                <div className='font-medium text-gray-900'>
                                    {serviceName}
                                </div>
                                <div className='text-sm text-gray-600 mt-1'>
                                    <div>{userName} • {userEmail}</div>
                                    <div className='text-xs text-gray-500'>
                                        Booked: {createdDate}
                                        {serviceDate && serviceTime && (
                                            <span> • Scheduled: {serviceDate} at {serviceTime}</span>
                                        )}
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 mt-2'>
                                    <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                        paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                                        paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                                        paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-blue-100 text-blue-800'
                                    }`}>
                                        {paymentStatus}
                                    </div>
                                    {booking.paymentInfo?.final_amount_invoiced && (
                                        <div className='text-xs text-gray-600 font-medium'>
                                            KSH {booking.paymentInfo.final_amount_invoiced.toLocaleString()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    }
                })}
            />
        </Card>
    )
}
