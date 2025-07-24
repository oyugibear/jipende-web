// Complete test of login flow followed by admin page functionality
const API_URL = 'http://localhost:8000/api/v1';

async function simulateCompleteFlow() {
  console.log('🚀 Starting complete admin flow simulation...\n');
  
  try {
    // Step 1: Login
    console.log('Step 1: Logging in with jroyugi@gmail.com...');
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
    console.log('Login status:', loginResponse.status);
    
    if (!loginData.status) {
      console.log('❌ Login failed:', loginData);
      return;
    }
    
    console.log('✅ Login successful!');
    console.log('User:', loginData.user.first_name, loginData.user.second_name);
    console.log('Role:', loginData.user.role);
    console.log('Token:', loginData.token.substring(0, 30) + '...\n');
    
    // Step 2: Simulate localStorage storage
    const token = loginData.token;
    const user = loginData.user;
    
    // Step 3: Test all admin endpoints as the frontend would
    console.log('Step 2: Testing admin dashboard data endpoints...\n');
    
    const endpoints = [
      { name: 'Bookings', path: '/bookings' },
      { name: 'Payments', path: '/payments' },
      { name: 'Users', path: '/users' }
    ];
    
    const results = {};
    
    for (const endpoint of endpoints) {
      console.log(`Testing ${endpoint.name}...`);
      
      try {
        const response = await fetch(`${API_URL}${endpoint.path}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        
        if (response.status === 200 && data.status === 'ok') {
          console.log(`✅ ${endpoint.name}: ${data.data.length} records`);
          results[endpoint.name.toLowerCase()] = {
            success: true,
            count: data.data.length,
            data: data.data.slice(0, 2) // First 2 records for preview
          };
        } else {
          console.log(`❌ ${endpoint.name}: ${response.status} - ${data.message || 'Unknown error'}`);
          results[endpoint.name.toLowerCase()] = {
            success: false,
            error: data.message || 'Unknown error'
          };
        }
      } catch (error) {
        console.log(`❌ ${endpoint.name}: Network error - ${error.message}`);
        results[endpoint.name.toLowerCase()] = {
          success: false,
          error: error.message
        };
      }
    }
    
    console.log('\n📊 Summary of Results:');
    console.log('======================');
    Object.entries(results).forEach(([key, result]) => {
      if (result.success) {
        console.log(`${key.toUpperCase()}: ✅ ${result.count} records available`);
      } else {
        console.log(`${key.toUpperCase()}: ❌ ${result.error}`);
      }
    });
    
    // Step 4: Check if all required data is available for admin dashboard
    const allSuccessful = Object.values(results).every(r => r.success);
    
    console.log('\n🎯 Admin Dashboard Status:');
    if (allSuccessful) {
      console.log('✅ ALL SYSTEMS GO! The admin dashboard should work perfectly.');
      console.log('✅ User can login with jroyugi@gmail.com / 123456');
      console.log('✅ All protected endpoints are accessible');
      console.log('✅ Data is available for the dashboard');
      
      // Sample data preview
      console.log('\n📋 Sample Data Preview:');
      if (results.bookings.success) {
        console.log('Latest Booking:', results.bookings.data[0]?._id);
      }
      if (results.payments.success) {
        console.log('Latest Payment:', results.payments.data[0]?._id);
      }
      if (results.users.success) {
        console.log('Total Users:', results.users.count);
      }
    } else {
      console.log('❌ ISSUES DETECTED:');
      Object.entries(results).forEach(([key, result]) => {
        if (!result.success) {
          console.log(`   - ${key}: ${result.error}`);
        }
      });
    }
    
    return {
      loginSuccessful: true,
      token,
      user,
      endpointResults: results,
      allEndpointsWorking: allSuccessful
    };
    
  } catch (error) {
    console.error('❌ Simulation failed:', error);
    return {
      loginSuccessful: false,
      error: error.message
    };
  }
}

simulateCompleteFlow();
