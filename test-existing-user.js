// Test login with provided credentials
const API_URL = 'http://localhost:8000/api/v1';

async function testExistingUser() {
  console.log('Testing login with jroyugi@gmail.com...');
  
  try {
    // Test login
    const loginResponse = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'jroyugi@gmail.com',
        password: '123456'
      })
    });
    
    console.log('Login response status:', loginResponse.status);
    const loginData = await loginResponse.json();
    console.log('Login response:', loginData);
    
    if (loginData.status && loginData.token) {
      console.log('Login successful!');
      console.log('User role:', loginData.user.role);
      console.log('Token:', loginData.token);
      
      // Test protected admin endpoints
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
    } else {
      console.log('Login failed:', loginData);
    }
  } catch (error) {
    console.error('Error testing login:', error);
  }
}

testExistingUser();
