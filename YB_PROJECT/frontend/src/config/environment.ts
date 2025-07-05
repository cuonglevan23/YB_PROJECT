export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  environment: import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  appName: import.meta.env.VITE_APP_NAME || 'YB Project',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
} as const;

export type Config = typeof config;
