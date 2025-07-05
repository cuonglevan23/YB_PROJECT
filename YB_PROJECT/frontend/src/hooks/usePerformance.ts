import { useEffect } from 'react';
import PerformanceMonitor from '../utils/performance';

export function usePerformanceMonitoring(componentName: string) {
  useEffect(() => {
    PerformanceMonitor.startMeasurement(`${componentName}_mount`);
    
    return () => {
      PerformanceMonitor.endMeasurement(`${componentName}_mount`);
    };
  }, [componentName]);
}

export function usePageLoadMetrics() {
  useEffect(() => {
    const handleLoad = () => {
      const metrics = PerformanceMonitor.getPageLoadMetrics();
      console.log('Page load metrics:', metrics);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);
}
