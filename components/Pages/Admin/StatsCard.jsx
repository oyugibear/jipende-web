import React from 'react'
import { Card, Statistic } from 'antd'

export default function StatsCard({ title, value, prefix, valueStyle, precision }) {
    return (
        <Card className="h-full">
            <Statistic
                title={title}
                value={value}
                prefix={prefix}
                precision={precision}
                valueStyle={valueStyle}
            />
        </Card>
    )
}
