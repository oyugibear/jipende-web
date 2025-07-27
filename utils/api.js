import { API_URL } from '@/config/api.config';

const getAuthHeaders = () => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        };
    }
    return {
        'Content-Type': 'application/json',
    };
};

export const apiCall = async (endpoint, options = {}) => {
    const url = `${API_URL}${endpoint}`;
    const headers = getAuthHeaders();
    const config = {
        headers,
        ...options,
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (response.status === 401) {
            // Token expired or invalid
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/auth/signin';
            }
            return null;
        }

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${data.message || 'Request failed'}`);
        }

        return data;
    } catch (error) {
        console.error('API call failed:', {
            endpoint,
            error: error.message,
            url
        });
        throw error;
    }
};

// Booking API functions
export const bookingAPI = {
    create: (bookingData) => apiCall('/bookings/add', {
        method: 'POST',
        body: JSON.stringify(bookingData),
    }),
    
    // Admin functions
    getAll: () => apiCall('/bookings'), // Admin only
    
    getUserBookings: (userId) => apiCall(`/bookings/user/${userId}`),
    
    getById: (id) => apiCall(`/bookings/${id}`),
    
    update: (id, data) => apiCall(`/bookings/rescheduleBooking/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    
    complete: (id) => apiCall(`/bookings/completeBooking/${id}`, {
        method: 'PUT',
    }),
    
    addLink: (id, link) => apiCall(`/bookings/addlink/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ link }),
    }),
};

// Service API functions
export const serviceAPI = {
    getAll: () => apiCall('/services'),
    
    getById: (id) => apiCall(`/services/${id}`),
    
    create: (serviceData) => apiCall('/services/add', {
        method: 'POST',
        body: JSON.stringify(serviceData),
    }),
    
    update: (id, data) => apiCall(`/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    
    delete: (id) => apiCall(`/services/${id}`, {
        method: 'DELETE',
    }),
};

// Payment API functions
export const paymentAPI = {
    // Admin functions
    getAll: () => apiCall('/payments'), // Admin only
    
    create: (paymentData) => apiCall('/payments/add', {
        method: 'POST',
        body: JSON.stringify(paymentData),
    }),
    
    getUserPayments: (userId) => apiCall(`/payments/user/${userId}`),
    
    getById: (id) => apiCall(`/payments/${id}`),
    
    edit: (id, data) => apiCall(`/payments/edit/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
};

// Blog API functions
export const blogAPI = {
    getAll: () => apiCall('/blogs'),
    
    getById: (id) => apiCall(`/blogs/${id}`),
    
    create: (blogData) => apiCall('/blogs/add', {
        method: 'POST',
        body: JSON.stringify(blogData),
    }),
    
    update: (id, data) => apiCall(`/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    
    delete: (id) => apiCall(`/blogs/${id}`, {
        method: 'DELETE',
    }),
};

// User API functions
export const userAPI = {
    getAll: () => apiCall('/users'),
    
    getById: (id) => apiCall(`/users/${id}`),
    
    update: (id, data) => apiCall(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    
    delete: (id) => apiCall(`/users/${id}`, {
        method: 'DELETE',
    }),
};

// General API object with common HTTP methods
export const api = {
    get: (endpoint) => apiCall(endpoint, { method: 'GET' }),
    
    post: (endpoint, data) => apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    
    put: (endpoint, data) => apiCall(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    
    delete: (endpoint) => apiCall(endpoint, { method: 'DELETE' }),
};
