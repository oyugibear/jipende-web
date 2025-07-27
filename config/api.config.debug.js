// Test API configuration
console.log('Environment:', process.env.NEXT_PUBLIC_ENVIRONMENT);
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
console.log('Live API URL:', process.env.NEXT_PUBLIC_LIVE_API_URL);

export const API_URL = 
process.env.NEXT_PUBLIC_ENVIRONMENT === "DEV"
  ? process.env.NEXT_PUBLIC_API_URL
  : process.env.NEXT_PUBLIC_LIVE_API_URL

console.log('Resolved API_URL:', API_URL);
