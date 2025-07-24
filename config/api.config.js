console.log('Environment check:', {
  NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_LIVE_API_URL: process.env.NEXT_PUBLIC_LIVE_API_URL
});

export const API_URL = 
process.env.NEXT_PUBLIC_ENVIRONMENT === "DEV"
  ? process.env.NEXT_PUBLIC_API_URL
  : process.env.NEXT_PUBLIC_LIVE_API_URL

console.log('Resolved API_URL:', API_URL);
