// ─── Central API Configuration ───────────────────────────────────────────────
// In development: set REACT_APP_API_BASE in your .env file
// In production:  set REACT_APP_API_BASE in Vercel dashboard environment variables
//
// Example .env:
//   REACT_APP_API_BASE=https://propertia-api.azurewebsites.net

const API_BASE = process.env.REACT_APP_API_BASE || 'https://propeitia-backhand.onrender.com';

export default API_BASE;
