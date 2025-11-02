import React from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValidationMessage {
  type: 'error' | 'warning' | 'success' | 'info';
  message: string;
}

interface EnhancedFormValidatorProps {
  validation?: ValidationMessage;
  fieldName?: string;
  showIcon?: boolean;
  className?: string;
}

const EnhancedFormValidator: React.FC<EnhancedFormValidatorProps> = ({
  validation,
  fieldName,
  showIcon = true,
  className
}) => {
  if (!validation) return null;

  const icons = {
    error: AlertCircle,
    warning: AlertCircle,
    success: CheckCircle2,
    info: Info
  };

  const Icon = icons[validation.type];

  const styles = {
    error: 'text-destructive bg-destructive/10 border-destructive/20',
    warning: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900',
    success: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900',
    info: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900'
  };

  return (
    <div 
      className={cn(
        'flex items-start gap-2 p-3 rounded-md border text-sm transition-all duration-200',
        styles[validation.type],
        className
      )}
      role="alert"
      aria-live="polite"
    >
      {showIcon && <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />}
      <div className="flex-1">
        {fieldName && (
          <span className="font-medium">{fieldName}: </span>
        )}
        <span>{validation.message}</span>
      </div>
    </div>
  );
};

export default EnhancedFormValidator;

// Helper function to create validation messages
export const createValidation = (
  type: ValidationMessage['type'],
  message: string
): ValidationMessage => ({
  type,
  message
});

// Common validation rules
export const validationRules = {
  required: (value: string) => 
    value.trim() ? null : createValidation('error', 'This field is required'),
  
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) 
      ? null 
      : createValidation('error', 'Please enter a valid email address');
  },
  
  minLength: (value: string, min: number) =>
    value.length >= min
      ? null
      : createValidation('error', `Must be at least ${min} characters`),
  
  maxLength: (value: string, max: number) =>
    value.length <= max
      ? null
      : createValidation('error', `Must be no more than ${max} characters`),
  
  url: (value: string) => {
    try {
      new URL(value);
      return null;
    } catch {
      return createValidation('error', 'Please enter a valid URL');
    }
  },
  
  phone: (value: string) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10
      ? null
      : createValidation('error', 'Please enter a valid phone number');
  }
};
