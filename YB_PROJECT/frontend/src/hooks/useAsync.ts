import { useState, useEffect, useCallback, useRef } from 'react';
import type { LoadingState } from '../types';

interface UseAsyncOptions {
  immediate?: boolean;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  options: UseAsyncOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);
  
  // Use ref to avoid stale closure issues
  const asyncFunctionRef = useRef(asyncFunction);
  asyncFunctionRef.current = asyncFunction;

  const { immediate = false } = options;

  const execute = useCallback(async () => {
    setLoading('loading');
    setError(null);

    try {
      const result = await asyncFunctionRef.current();
      setData(result);
      setLoading('success');
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoading('error');
      throw err;
    }
  }, []); // Empty dependency array since we use ref

  const reset = useCallback(() => {
    setData(null);
    setLoading('idle');
    setError(null);
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    isLoading: loading === 'loading',
    isError: loading === 'error',
    isSuccess: loading === 'success',
    isIdle: loading === 'idle'
  };
}
