import type { ApiResponse, ApiError } from '../../types/api/reports';
import { config } from '../../config/environment';
import Logger from '../logger';

interface RequestConfig extends RequestInit {
  timeout?: number;
  retries?: number;
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;
  private defaultTimeout = 10000; // 10 seconds
  private defaultRetries = 3;

  constructor(baseURL: string = config.apiUrl) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { timeout = this.defaultTimeout, retries = this.defaultRetries, ...fetchOptions } = options;
    
    return this.withRetry(
      () => this.makeRequest<T>(endpoint, fetchOptions, timeout),
      retries,
      endpoint
    );
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit,
    timeout: number
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('accessToken');
    
    const headers = {
      ...this.defaultHeaders,
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      Logger.debug(`API Request: ${options.method || 'GET'} ${url}`, { headers, body: options.body }, 'ApiClient');
      
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error: ApiError = await response.json().catch(() => ({
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status
        }));
        
        Logger.error(`API Error: ${response.status}`, error, 'ApiClient');
        throw new Error(error.message || 'API request failed');
      }

      const result = await response.json();
      Logger.debug(`API Response: ${options.method || 'GET'} ${url}`, result, 'ApiClient');
      
      return result;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          Logger.error(`API Timeout: ${url}`, error, 'ApiClient');
          throw new Error('Request timeout');
        }
        Logger.error(`API Network Error: ${url}`, error, 'ApiClient');
        throw error;
      }
      
      Logger.error(`API Unknown Error: ${url}`, error, 'ApiClient');
      throw new Error('Network error occurred');
    }
  }

  private async withRetry<T>(
    fn: () => Promise<T>,
    retries: number,
    context: string
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        if (attempt === retries) {
          Logger.error(`API Max retries reached for ${context}`, lastError, 'ApiClient');
          throw lastError;
        }
        
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // Exponential backoff
        Logger.warn(`API Retry ${attempt}/${retries} for ${context} in ${delay}ms`, lastError, 'ApiClient');
        
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError!;
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    
    return this.request<T>(url.pathname + url.search);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
