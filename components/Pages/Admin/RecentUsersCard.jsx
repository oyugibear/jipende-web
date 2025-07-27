import React from 'react'
import { Card, List, Avatar } from 'antd'
import { TeamOutlined, UserOutlined } from '@ant-design/icons'

export default function RecentUsersCard({ recentUsers }) {
    return (
        <Card title="Recent Users" extra={<TeamOutlined />} className="h-full">
            <List
                itemLayout="horizontal"
                dataSource={recentUsers}
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
    )
}
