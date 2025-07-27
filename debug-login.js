// Debug script to test login flow
const API_URL = 'http://localhost:8000/api/v1';

async function testLogin() {
  console.log('Testing login flow...');
  
  try {
    // Test login
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
    
    console.log('Login response status:', loginResponse.status);
    const loginData = await loginResponse.json();
    console.log('Login response:', loginData);
    
    if (loginData.success && loginData.token) {
      console.log('Login successful, token:', loginData.token);
      
      // Test protected endpoints with token
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
    console.error('Error testing login:', error);
  }
}

testLogin();
