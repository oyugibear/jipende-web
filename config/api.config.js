export const API_URL = 
process.env.NEXT_PUBLIC_ENVIRONMENT === "DEV"
  ? process.env.NEXT_PUBLIC_API_URL
  : process.env.NEXT_PUBLIC_LIVE_API_URL
