// App Constants
export const APP_CONSTANTS = {
  NAME: 'YB Project',
  VERSION: '1.0.0',
  DESCRIPTION: 'AI-powered YouTube content optimization platform',
} as const;

// API Constants
export const API_CONSTANTS = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// UI Constants
export const UI_CONSTANTS = {
  SIDEBAR_WIDTH: {
    COLLAPSED: 64,
    EXPANDED: 256,
  },
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
  },
  ANIMATION_DURATION: 300,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_PREFERENCES: 'userPreferences',
  THEME: 'theme',
  LANGUAGE: 'language',
  SIDEBAR_STATE: 'sidebarState',
} as const;

// Route Constants
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/',
  OPTIMIZE: '/optimize',
  RESEARCH: '/research',
  CREATE: '/create',
  COACH: '/coach',
  SEO: '/seo',
  // Create sub-routes
  CREATE_THUMBNAILS: '/create/thumbnails',
  CREATE_IDEAS: '/create/ideas',
  CREATE_SCRIPT: '/create/script',
  CREATE_VIDEO: '/create/GenerateVideo',
  // Research sub-routes
  RESEARCH_KEYWORDS: '/research/keywords',
  RESEARCH_COMPETITORS: '/research/competitors',
  RESEARCH_OUTLIERS: '/research/outliers',
  RESEARCH_SUBSCRIBERS: '/research/subscribers',
  // Coach sub-routes
  COACH_AI_CHAT: '/coach/ai-chat',
  COACH_LEARN: '/coach/learn',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Internal server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  PASSWORD_RESET_SUCCESS: 'Password reset email sent!',
  SAVE_SUCCESS: 'Saved successfully!',
  UPDATE_SUCCESS: 'Updated successfully!',
  DELETE_SUCCESS: 'Deleted successfully!',
  EXPORT_SUCCESS: 'Export completed successfully!',
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 128,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 5000,
} as const;

// File Upload Constants
export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/avi', 'video/mov', 'video/mkv'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'text/plain', 'application/msword'],
} as const;

// Date/Time Constants
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_WITH_TIME: 'MMM DD, YYYY HH:mm',
  ISO: 'YYYY-MM-DD',
  TIME: 'HH:mm',
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_AI_CHAT: true,
  ENABLE_PREMIUM_FEATURES: true,
  ENABLE_ANALYTICS: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_DARK_MODE: true,
  ENABLE_MULTI_LANGUAGE: true,
} as const;

// Environment-specific constants
export const ENV_CONSTANTS = {
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
  IS_TEST: import.meta.env.MODE === 'test',
} as const;
