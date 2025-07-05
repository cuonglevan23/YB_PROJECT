import React from 'react';
import { config } from '../config/environment';
import Logger from '../services/logger';

interface PerformanceMetrics {
  name: string;
  startTime: number;
  endTime: number;
  duration: number;
  timestamp: Date;
  userAgent: string;
  url: string;
}

class PerformanceMonitor {
  private static measurements: Map<string, number> = new Map();
  private static metrics: PerformanceMetrics[] = [];

  static startMeasurement(name: string): void {
    const startTime = performance.now();
    this.measurements.set(name, startTime);
    
    Logger.debug(`Performance measurement started: ${name}`, { startTime }, 'PerformanceMonitor');
  }

  static endMeasurement(name: string): number {
    const endTime = performance.now();
    const startTime = this.measurements.get(name);
    
    if (!startTime) {
      Logger.warn(`Performance measurement not found: ${name}`, undefined, 'PerformanceMonitor');
      return 0;
    }
    
    const duration = endTime - startTime;
    this.measurements.delete(name);
    
    const metrics: PerformanceMetrics = {
      name,
      startTime,
      endTime,
      duration,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };
    
    this.metrics.push(metrics);
    
    Logger.debug(`Performance measurement completed: ${name}`, {
      durationMs: `${duration.toFixed(2)}ms`,
      startTime,
      endTime
    }, 'PerformanceMonitor');
    
    // Send to analytics in production
    if (config.isProduction) {
      this.sendToAnalytics(metrics);
    }
    
    return duration;
  }

  static measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.startMeasurement(name);
      
      fn()
        .then(result => {
          this.endMeasurement(name);
          resolve(result);
        })
        .catch(error => {
          this.endMeasurement(name);
          reject(error);
        });
    });
  }

  static measureSync<T>(name: string, fn: () => T): T {
    this.startMeasurement(name);
    
    try {
      const result = fn();
      this.endMeasurement(name);
      return result;
    } catch (error) {
      this.endMeasurement(name);
      throw error;
    }
  }

  static getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  static clearMetrics(): void {
    this.metrics.length = 0;
    this.measurements.clear();
  }

  static getPageLoadMetrics(): Record<string, number> {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (!navigation) {
      return {};
    }
    
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      domInteractive: navigation.domInteractive - navigation.fetchStart,
      firstPaint: this.getFirstPaint(),
      firstContentfulPaint: this.getFirstContentfulPaint(),
    };
  }

  private static getFirstPaint(): number {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? firstPaint.startTime : 0;
  }

  private static getFirstContentfulPaint(): number {
    const paintEntries = performance.getEntriesByType('paint');
    const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return firstContentfulPaint ? firstContentfulPaint.startTime : 0;
  }

  private static sendToAnalytics(metrics: PerformanceMetrics): void {
    // TODO: Send to analytics service
    Logger.info('Performance metrics sent to analytics', metrics, 'PerformanceMonitor');
  }
}

// HOC for measuring component render time
export function withPerformanceMonitoring<P extends object>(
  Component: React.ComponentType<P>,
  displayName?: string
): React.ComponentType<P> {
  const componentName = displayName || Component.displayName || Component.name || 'Unknown';
  
  return function PerformanceMonitoredComponent(props: P) {
    const measurementName = `${componentName}_render`;
    
    React.useEffect(() => {
      PerformanceMonitor.startMeasurement(measurementName);
      
      return () => {
        PerformanceMonitor.endMeasurement(measurementName);
      };
    });
    
    return React.createElement(Component, props);
  };
}

export default PerformanceMonitor;
