'use client'

import { Card, Button, Tag, Typography, Space, Avatar, Tooltip } from 'antd'
import { CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined, UserOutlined, VideoCameraOutlined, LinkOutlined } from '@ant-design/icons'
import Image from 'next/image'
import React, { useState } from 'react'
import dayjs from 'dayjs'

const { Title, Text, Paragraph } = Typography

export default function SessionCard({ data, type, booking }) {
  const [imageError, setImageError] = useState(false)

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not set'
    try {
      return dayjs(dateString).format('MMMM D, YYYY')
    } catch {
      return dateString
    }
  }

  const formatTime = (timeString) => {
    if (!timeString) return 'Time not set'
    try {
      return dayjs(timeString, 'HH:mm').format('h:mm A')
    } catch {
      return timeString
    }
  }

  const getStatusColor = () => {
    const now = dayjs()
    const sessionDate = dayjs(data?.date)
    
    if (sessionDate.isBefore(now, 'day')) return 'default'
    if (sessionDate.isSame(now, 'day')) return 'warning'
    return 'success'
  }

  const getStatusText = () => {
    const now = dayjs()
    const sessionDate = dayjs(data?.date)
    
    if (sessionDate.isBefore(now, 'day')) return 'Completed'
    if (sessionDate.isSame(now, 'day')) return 'Today'
    return 'Upcoming'
  }

  const handleJoinMeeting = () => {
    if (data?.meeting_link) {
      window.open(data.meeting_link, '_blank')
    }
  }

  return (
    <Card
      className="mb-4 hover:shadow-md transition-shadow duration-200"
      styles={{
        body: { padding: '20px' }
      }}
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <div className="w-full lg:w-64 h-48 relative overflow-hidden rounded-lg bg-gray-100">
            {!imageError && data?.picture ? (
              <Image
                src={data.picture}
                alt={data?.title || 'Service image'}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <UserOutlined className="text-4xl text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0">
              <Title level={4} className="!mb-1 !text-gray-900">
                {data?.title || 'Untitled Session'}
              </Title>
              <div className="flex flex-wrap gap-2 mb-2">
                <Tag color={type === 'Online' ? 'blue' : 'green'} icon={type === 'Online' ? <VideoCameraOutlined /> : <EnvironmentOutlined />}>
                  {type === 'Online' ? 'Online Session' : 'In-Person Session'}
                </Tag>
                <Tag color={getStatusColor()}>
                  {getStatusText()}
                </Tag>
              </div>
            </div>
          </div>

          {data?.description && (
            <Paragraph
              ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
              className="!text-gray-600 !mb-4"
            >
              {data.description}
            </Paragraph>
          )}

          {/* Session Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <Space className="text-gray-600">
              <CalendarOutlined className="text-[#eab308]" />
              <Text>{formatDate(data?.date)}</Text>
            </Space>
            <Space className="text-gray-600">
              <ClockCircleOutlined className="text-[#eab308]" />
              <Text>{formatTime(data?.time)}</Text>
            </Space>
          </div>

          {/* Therapist Info */}
          {/* {booking?.therapist && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <Text className="text-sm font-medium text-gray-700 block mb-1">Therapist</Text>
              <Space>
                <Avatar
                  src={booking.therapist.profilePicture}
                  icon={<UserOutlined />}
                  size="small"
                />
                <Text className="font-medium">
                  {booking.therapist.first_name} {booking.therapist.second_name}
                </Text>
              </Space>
            </div>
          )} */}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {type === 'Online' && (
              <>
                {data?.meeting_link ? (
                  <Button
                    type="primary"
                    icon={<VideoCameraOutlined />}
                    onClick={handleJoinMeeting}
                    className="bg-[#eab308] hover:bg-[#ca8a04] border-[#eab308] hover:border-[#ca8a04]"
                  >
                    Join Meeting
                  </Button>
                ) : (
                  <Tooltip title="Meeting link will be available closer to the session date">
                    <Button
                      disabled
                      icon={<VideoCameraOutlined />}
                      className="opacity-50"
                    >
                      Meeting Link Unavailable
                    </Button>
                  </Tooltip>
                )}
              </>
            )}
            
            {/* {type === 'In-Person' && data?.location && (
              <Button
                icon={<EnvironmentOutlined />}
                href={`https://maps.google.com/?q=${encodeURIComponent(data.location)}`}
                target="_blank"
              >
                View Location
              </Button>
            )} */}
          </div>
        </div>
      </div>
    </Card>
  )
}
