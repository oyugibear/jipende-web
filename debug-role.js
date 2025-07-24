// Debug script to fix admin user role
const API_URL = 'http://localhost:8000/api/v1';

async function updateAdminRole() {
  console.log('Updating admin user role...');
  
  try {
    // First login to get token
    const loginResponse = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@admin.com',
        password: 'admin123'
      })
    });
    
    const loginData = await loginResponse.json();
    
    if (loginData.status && loginData.token) {
      console.log('Login successful, user ID:', loginData.user._id);
      console.log('Current role:', loginData.user.role);
      
      // Since we don't have a direct API to update user role, let's just test the endpoints
      // with our current token
      const endpoints = [
        '/bookings',
        '/payments', 
        '/users'
      ];
      
      for (const endpoint of endpoints) {
        console.log(`\nTesting ${endpoint}...`);
        const response = await fetch(`${API_URL}${endpoint}`, {
          headers: {
            'Authorization': `Bearer ${loginData.token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log(`${endpoint} status:`, response.status);
        const data = await response.json();
        console.log(`${endpoint} response:`, data);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

updateAdminRole();
