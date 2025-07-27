'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '@/config/api.config';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedToken = localStorage.getItem('token');
            const savedUser = localStorage.getItem('user');
            
            if (savedToken && savedUser) {
                setToken(savedToken);
                setUser(JSON.parse(savedUser));
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            // Check both HTTP status and response data status
            if (response.ok && data.status) {
                setToken(data.token);
                setUser(data.user);
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
                return { success: true, data };
            } else {
                // Handle both HTTP errors and API-level errors
                const errorMessage = data.message || data.error || `HTTP Error: ${response.status} ${response.statusText}`;
                console.error('Login failed:', errorMessage);
                return { success: false, message: errorMessage };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Login failed. Please check your connection and try again.' };
        }
    };

    const register = async (userData) => {
        try {
            console.log('Sending registration data:', userData);
            
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            console.log('Registration response status:', response.status);
            const data = await response.json();
            console.log('Registration response data:', data);

            // Check both HTTP status and response data status
            if (response.ok && data.status) {
                setToken(data.token);
                setUser(data.user);
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
                return { success: true, data };
            } else {
                // Handle both HTTP errors and API-level errors
                const errorMessage = data.message || data.error || `HTTP Error: ${response.status} ${response.statusText}`;
                console.error('Registration failed:', errorMessage);
                return { success: false, message: errorMessage };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Registration failed. Please check your connection and try again.' };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    };

    const updateUser = (updatedUserData) => {
        const newUser = { ...user, ...updatedUserData };
        setUser(newUser);
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(newUser));
        }
    };

    const value = {
        user,
        token,
        login,
        register,
        logout,
        updateUser,
        loading,
        isAuthenticated: !!token,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
