'use client'

import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'
import { userAPI, serviceAPI, blogAPI, bookingAPI, paymentAPI } from '@/utils/api'

export default function AdminTest() {
    const { user, loading, isAuthenticated } = useAuth()
    const [data, setData] = useState({})
    const [dataLoading, setDataLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            console.log('Test Admin State:', { user, loading, isAuthenticated })
            
            if (!loading && user) {
                console.log('User found:', user)
                try {
                    console.log('Attempting to fetch users...')
                    const users = await userAPI.getAll()
                    console.log('Users response:', users)
                    setData({ users })
                } catch (error) {
                    console.error('Error fetching data:', error)
                } finally {
                    setDataLoading(false)
                }
            }
        }
        
        fetchData()
    }, [user, loading, isAuthenticated])

    if (loading) {
        return <div>Loading auth...</div>
    }

    if (!user) {
        return <div>No user found</div>
    }

    if (dataLoading) {
        return <div>Loading data...</div>
    }

    return (
        <div>
            <h1>Admin Test Page</h1>
            <p>User: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Users count: {data.users?.data?.length || 0}</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
