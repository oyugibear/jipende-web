// Test the exact login flow with provided credentials
const API_URL = 'http://localhost:8000/api/v1';

async function testFrontendLogin() {
  console.log('Testing frontend login flow with jroyugi@gmail.com...');
  
  try {
    // Test login exactly as frontend does
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'jroyugi@gmail.com',
        password: '123456'
      })
    });
    
    console.log('Login response status:', response.status);
    const data = await response.json();
    console.log('Login response:', data);
    
    if (data.status && data.token) {
      console.log('✅ Login successful!');
      console.log('User:', data.user);
      console.log('Token:', data.token);
      console.log('Role:', data.user.role);
      
      // Store credentials like frontend would
      console.log('\n📝 Storing credentials in localStorage simulation...');
      const tokenStorage = data.token;
      const userStorage = JSON.stringify(data.user);
      
      console.log('Token stored:', tokenStorage.substring(0, 20) + '...');
      console.log('User stored:', userStorage);
      
      // Test admin endpoints
      console.log('\n🔒 Testing admin endpoints...');
      const endpoints = [
        '/bookings',
        '/payments', 
        '/users'
      ];
      
      for (const endpoint of endpoints) {
        console.log(`\nTesting ${endpoint}...`);
        const response = await fetch(`${API_URL}${endpoint}`, {
          headers: {
            'Authorization': `Bearer ${data.token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log(`${endpoint} status:`, response.status);
        if (response.status === 200) {
          const responseData = await response.json();
          console.log(`${endpoint} success! Data count:`, responseData.data ? responseData.data.length : 'N/A');
        } else {
          const errorData = await response.json();
          console.log(`${endpoint} error:`, errorData);
        }
      }
      
      return { success: true, token: data.token, user: data.user };
    } else {
      console.log('❌ Login failed:', data);
      return { success: false, error: data };
    }
  } catch (error) {
    console.error('❌ Error during login:', error);
    return { success: false, error: error.message };
  }
}

testFrontendLogin();
