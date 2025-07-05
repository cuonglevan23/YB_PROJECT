import { config } from '../config/environment';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogData {
  message: string;
  data?: unknown;
  timestamp?: Date;
  level: LogLevel;
  context?: string;
}

class Logger {
  private static formatMessage(logData: LogData): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${logData.level.toUpperCase()}] ${logData.context ? `[${logData.context}]` : ''} ${logData.message}`;
  }

  static info(message: string, data?: unknown, context?: string): void {
    const logData: LogData = { message, data, level: 'info', context };
    
    if (config.isDevelopment) {
      console.log(this.formatMessage(logData), data || '');
    }
  }

  static warn(message: string, data?: unknown, context?: string): void {
    const logData: LogData = { message, data, level: 'warn', context };
    
    if (config.isDevelopment) {
      console.warn(this.formatMessage(logData), data || '');
    }
  }

  static error(message: string, error?: Error | unknown, context?: string): void {
    const logData: LogData = { message, data: error, level: 'error', context };
    
    // Always log errors, even in production
    console.error(this.formatMessage(logData), error || '');
    
    // In production, send to error tracking service
    if (config.isProduction) {
      this.sendToErrorTracking(logData, error);
    }
  }

  static debug(message: string, data?: unknown, context?: string): void {
    const logData: LogData = { message, data, level: 'debug', context };
    
    if (config.isDevelopment) {
      console.debug(this.formatMessage(logData), data || '');
    }
  }

  private static sendToErrorTracking(logData: LogData, error?: Error | unknown): void {
    // TODO: Implement error tracking service integration (Sentry, LogRocket, etc.)
    // For now, just log to console in production as well
    console.error('[ERROR_TRACKING]', {
      ...logData,
      error,
      userAgent: navigator.userAgent,
      url: window.location.href,
    });
  }
}

export default Logger;
