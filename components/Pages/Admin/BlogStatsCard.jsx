import React from 'react'
import { Card, Statistic, Progress } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'

export default function BlogStatsCard({ totalBlogs }) {
    return (
        <Card title="Total Blogs" extra={<FileTextOutlined />} className="h-full">
            <Statistic
                title="Published Articles"
                value={totalBlogs || 0}
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
    )
}
