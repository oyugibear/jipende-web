// Debug script to create admin user if needed
const API_URL = 'http://localhost:8000/api/v1';

async function createAdminUser() {
  console.log('Creating admin user...');
  
  try {
    const signupResponse = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@admin.com',
        password: 'admin123',
        first_name: 'Admin',
        second_name: 'User',
        role: 'Admin',
        phone_number: '+1234567890',
        country_of_residence: 'Kenya',
        date_of_birth: '1990-01-01',
        nationality: 'Kenyan'
      })
    });
    
    console.log('Signup response status:', signupResponse.status);
    const signupData = await signupResponse.json();
    console.log('Signup response:', signupData);
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

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
    
    if (loginData.status && loginData.token) {
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

// First try login, if it fails, create user and try again
testLogin().then((result) => {
  // Login failed, let's create admin user
  createAdminUser().then(() => testLogin());
});
