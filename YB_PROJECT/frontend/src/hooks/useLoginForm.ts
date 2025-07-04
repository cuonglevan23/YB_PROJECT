import { useState, useCallback } from 'react';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

interface UseLoginFormReturn {
  formData: LoginFormData;
  errors: LoginFormErrors;
  isValid: boolean;
  handleChange: (field: keyof LoginFormData, value: string) => void;
  handleSubmit: (onSubmit: (data: LoginFormData) => void | Promise<void>) => (e: React.FormEvent) => Promise<void>;
  reset: () => void;
  setError: (field: keyof LoginFormErrors, message: string) => void;
  clearErrors: () => void;
}

const initialFormData: LoginFormData = {
  email: '',
  password: '',
};

export function useLoginForm(): UseLoginFormReturn {
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [errors, setErrors] = useState<LoginFormErrors>({});

  const validateField = useCallback((field: keyof LoginFormData, value: string): string | undefined => {
    switch (field) {
      case 'email':
        if (!value.trim()) {
          return 'Email is required';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
      case 'password':
        if (!value.trim()) {
          return 'Password is required';
        }
        if (value.length < 6) {
          return 'Password must be at least 6 characters';
        }
        break;
    }
    return undefined;
  }, []);

  const handleChange = useCallback((field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback((onSubmit: (data: LoginFormData) => void | Promise<void>) => {
    return async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Validate all fields
      const newErrors: LoginFormErrors = {};
      Object.keys(formData).forEach(key => {
        const field = key as keyof LoginFormData;
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
        }
      });

      setErrors(newErrors);

      // If no errors, submit the form
      if (Object.keys(newErrors).length === 0) {
        await onSubmit(formData);
      }
    };
  }, [formData, validateField]);

  const reset = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
  }, []);

  const setError = useCallback((field: keyof LoginFormErrors, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const isValid = Object.keys(errors).length === 0 && 
                  formData.email.trim() !== '' && 
                  formData.password.trim() !== '';

  return {
    formData,
    errors,
    isValid,
    handleChange,
    handleSubmit,
    reset,
    setError,
    clearErrors,
  };
}