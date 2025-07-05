// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  ENDPOINTS: {
    THUMBNAILS: {
      GENERATE: '/thumbnails/generate',
      CHAT: '/thumbnails/chat',
      HISTORY: '/thumbnails/history',
      DELETE: '/thumbnails',
    },
    SCRIPTS: {
      GENERATE: '/scripts/generate',
      CHAT: '/scripts/chat',
      SAVE: '/scripts/save',
      USER: '/scripts/user',
      DELETE: '/scripts',
    },
  },
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
};

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    ...API_CONFIG.DEFAULT_HEADERS,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function to build URL
export const buildApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
