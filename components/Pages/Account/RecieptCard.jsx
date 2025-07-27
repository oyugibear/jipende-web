import React from 'react'
import { Card, Button, Typography, Tag, Space } from 'antd'
import { DownloadOutlined, MoneyCollectOutlined, CalendarOutlined } from '@ant-design/icons'

const { Text, Title } = Typography

export default function RecieptCard({ title, date, link, amount, paymentMethod }) {
  const handleDownload = () => {
    if (link) {
      window.open(link, '_blank')
    }
  }

  const formatAmount = (amount) => {
    if (!amount) return 'N/A'
    return typeof amount === 'number' ? `$${amount.toFixed(2)}` : `$${amount}`
  }

  return (
    <Card 
      className="mb-4 hover:shadow-md transition-shadow duration-200"
      styles={{ body: { padding: '20px' } }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <Title level={5} className="!mb-2 !text-gray-900">
            {title || 'Therapy Session Receipt'}
          </Title>
          
          <Space direction="vertical" size="small">
            <Space className="text-gray-600">
              <CalendarOutlined className="text-[#eab308]" />
              <Text>{date || 'Date not available'}</Text>
            </Space>
            
            {amount && (
              <Space className="text-gray-600">
                <MoneyCollectOutlined className="text-[#eab308]" />
                <Text>{formatAmount(amount)}</Text>
              </Space>
            )}
            
            {paymentMethod && (
              <Tag color="blue">{paymentMethod}</Tag>
            )}
          </Space>
        </div>
        
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleDownload}
          disabled={!link}
          className="bg-[#eab308] hover:bg-[#ca8a04] border-[#eab308] hover:border-[#ca8a04]"
        >
          Download Receipt
        </Button>
      </div>
    </Card>
  )
}
