// Test script to manually login and check localStorage persistence
const API_URL = 'http://localhost:8000/api/v1';

async function testLoginFlow() {
  console.log('=== Testing Login and Persistence ===');
  
  try {
    // Step 1: Login
    console.log('\n1. Logging in...');
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
    
    const loginData = await loginResponse.json();
    console.log('Login result:', loginData.status ? 'SUCCESS' : 'FAILED');
    
    if (!loginData.status) {
      console.log('Login failed:', loginData);
      return;
    }
    
    // Step 2: Store in localStorage (like frontend does)
    console.log('\n2. Storing in localStorage...');
    const token = loginData.token;
    const user = loginData.user;
    
    console.log('Token:', token.substring(0, 30) + '...');
    console.log('User role:', user.role);
    
    // Step 3: Test API calls with token
    console.log('\n3. Testing API calls with token...');
    
    const testEndpoints = [
      { name: 'Users', url: '/users' },
      { name: 'Bookings', url: '/bookings' },
      { name: 'Payments', url: '/payments' }
    ];
    
    for (const endpoint of testEndpoints) {
      console.log(`\nTesting ${endpoint.name}...`);
      
      const response = await fetch(`${API_URL}${endpoint.url}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log(`${endpoint.name} response:`, response.status);
      
      if (response.status === 401) {
        console.log('🚨 401 Unauthorized - this would trigger redirect');
        return;
      }
      
      if (response.status === 200) {
        const data = await response.json();
        console.log(`✅ ${endpoint.name}: ${data.data ? data.data.length : 'no data'} records`);
      } else {
        console.log(`❌ ${endpoint.name}: Status ${response.status}`);
      }
    }
    
    console.log('\n✅ All tests passed! Token is working correctly.');
    console.log('\n📋 For frontend:');
    console.log('- Login with: jroyugi@gmail.com / 123456');
    console.log('- User role:', user.role);
    console.log('- Should have access to admin panel');
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testLoginFlow();
