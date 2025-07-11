// API endpoints and configurations
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com'

export const API_ENDPOINTS = {
  songs: '/songs',
  playlists: '/playlists',
  artists: '/artists',
  albums: '/albums',
  users: '/users',
  auth: '/auth',
}

export const API_CONFIG = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
} 