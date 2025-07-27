'use client'

import { useEffect } from 'react'

export default function TestLogin() {
    
    const testLogin = async () => {
        try {
            console.log('Testing manual login...')
            
            const response = await fetch('http://localhost:8000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'jroyugi@gmail.com',
                    password: '123456'
                }),
            });

            const data = await response.json();
            console.log('Manual login response:', data);

            if (data.status) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                alert('Login successful! Token and user saved. You can now navigate to /admin');
            } else {
                alert('Login failed: ' + data.message);
            }
        } catch (error) {
            console.error('Manual login error:', error);
            alert('Login error: ' + error.message);
        }
    }

    const clearAuth = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert('Auth cleared');
    }

    const testAPI = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('No token found. Please login first.');
                return;
            }

            const response = await fetch('http://localhost:8000/api/v1/users', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            console.log('API test response:', data);
            alert(`API test: ${data.data ? data.data.length + ' users found' : 'Failed'}`);
        } catch (error) {
            console.error('API test error:', error);
            alert('API test error: ' + error.message);
        }
    }

    return (
        <div style={{padding: '20px'}}>
            <h1>Login Test Page</h1>
            <button onClick={testLogin} style={{margin: '10px', padding: '10px'}}>Test Login</button>
            <button onClick={clearAuth} style={{margin: '10px', padding: '10px'}}>Clear Auth</button>
            <button onClick={testAPI} style={{margin: '10px', padding: '10px'}}>Test API</button>
            <br />
            <a href="/admin" style={{margin: '10px'}}>Go to Admin Page</a>
            <br />
            <a href="/admin-test" style={{margin: '10px'}}>Go to Admin Test Page</a>
        </div>
    )
}
