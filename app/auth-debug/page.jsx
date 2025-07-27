'use client'

import { useAuth } from '@/context/AuthContext'
import { useState, useEffect } from 'react'

export default function AuthDebugPage() {
    const { user, token, loading, isAuthenticated } = useAuth()
    const [hasMounted, setHasMounted] = useState(false)
    const [localStorageData, setLocalStorageData] = useState({})

    useEffect(() => {
        setHasMounted(true)
        if (typeof window !== 'undefined') {
            setLocalStorageData({
                token: localStorage.getItem('token'),
                user: localStorage.getItem('user')
            })
        }
    }, [])

    const handleLogin = async () => {
        const { login } = useAuth()
        const result = await login('jroyugi@gmail.com', '123456')
        console.log('Login result:', result)
    }

    if (!hasMounted) {
        return <div>Mounting...</div>
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Authentication Debug Page</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Auth Context State</h2>
                    <div className="space-y-2">
                        <p><strong>Loading:</strong> {loading ? 'true' : 'false'}</p>
                        <p><strong>Is Authenticated:</strong> {isAuthenticated ? 'true' : 'false'}</p>
                        <p><strong>Has Token:</strong> {token ? 'yes' : 'no'}</p>
                        <p><strong>Has User:</strong> {user ? 'yes' : 'no'}</p>
                        {user && (
                            <div className="mt-4 p-3 bg-gray-50 rounded">
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Role:</strong> {user.role}</p>
                                <p><strong>Name:</strong> {user.first_name} {user.second_name}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">LocalStorage Data</h2>
                    <div className="space-y-2">
                        <p><strong>Token in localStorage:</strong> {localStorageData.token ? 'yes' : 'no'}</p>
                        <p><strong>User in localStorage:</strong> {localStorageData.user ? 'yes' : 'no'}</p>
                        {localStorageData.user && (
                            <div className="mt-4 p-3 bg-gray-50 rounded">
                                <pre className="text-xs">{localStorageData.user}</pre>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Test Login</h2>
                    <button 
                        onClick={handleLogin}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Test Login with jroyugi@gmail.com
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Raw Debug Info</h2>
                    <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
                        {JSON.stringify({
                            user,
                            token: token ? token.substring(0, 20) + '...' : null,
                            loading,
                            isAuthenticated,
                            hasMounted
                        }, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    )
}
