import { useState, useCallback, useMemo } from 'react';
import { ValidationError, FormValidation } from '../types';

export type ValidationRule<T> = {
  validate: (value: T) => boolean;
  message: string;
};

export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRules<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);
  const [isDirty, setIsDirty] = useState(false);

  // Validate a single field
  const validateField = useCallback(
    (fieldName: keyof T, value: any): ValidationError[] => {
      const rules = validationRules[fieldName];
      if (!rules) return [];

      const errors: ValidationError[] = [];
      
      for (const rule of rules) {
        if (!rule.validate(value)) {
          errors.push({
            field: fieldName as string,
            message: rule.message
          });
        }
      }

      return errors;
    },
    [validationRules]
  );

  // Validate all fields - memoized to prevent unnecessary recalculations
  const validation = useMemo((): FormValidation => {
    const allErrors: ValidationError[] = [];

    for (const fieldName in validationRules) {
      const fieldErrors = validateField(fieldName, values[fieldName]);
      allErrors.push(...fieldErrors);
    }

    return {
      isValid: allErrors.length === 0,
      errors: allErrors
    };
  }, [values, validationRules, validateField]);

  // Get errors for a specific field
  const getFieldErrors = useCallback(
    (fieldName: keyof T): string[] => {
      return validation.errors
        .filter(error => error.field === fieldName)
        .map(error => error.message);
    },
    [validation.errors]
  );

  // Check if field has been touched and has errors
  const hasFieldError = useCallback(
    (fieldName: keyof T): boolean => {
      return touched[fieldName] && getFieldErrors(fieldName).length > 0;
    },
    [touched, getFieldErrors]
  );

  // Update a single field value
  const setFieldValue = useCallback(
    (fieldName: keyof T, value: any) => {
      setValues(prev => ({ ...prev, [fieldName]: value }));
      setIsDirty(true);
    },
    []
  );

  // Mark field as touched
  const setFieldTouched = useCallback(
    (fieldName: keyof T, isTouched: boolean = true) => {
      setTouched(prev => ({ ...prev, [fieldName]: isTouched }));
    },
    []
  );

  // Handle input change
  const handleChange = useCallback(
    (fieldName: keyof T) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = event.target.type === 'checkbox' 
        ? (event.target as HTMLInputElement).checked 
        : event.target.value;
      setFieldValue(fieldName, value);
    },
    [setFieldValue]
  );

  // Handle input blur
  const handleBlur = useCallback(
    (fieldName: keyof T) => () => {
      setFieldTouched(fieldName, true);
    },
    [setFieldTouched]
  );

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setTouched({} as Record<keyof T, boolean>);
    setIsDirty(false);
  }, [initialValues]);

  // Validate and submit
  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void) => (event: React.FormEvent) => {
      event.preventDefault();
      
      // Mark all fields as touched
      const allTouched = Object.keys(validationRules).reduce((acc, key) => {
        acc[key as keyof T] = true;
        return acc;
      }, {} as Record<keyof T, boolean>);
      setTouched(allTouched);

      // Submit if valid
      if (validation.isValid) {
        onSubmit(values);
      }
    },
    [values, validation.isValid, validationRules]
  );

  return {
    values,
    validation,
    touched,
    isDirty,
    setFieldValue,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldErrors,
    hasFieldError,
    reset
  };
}

// Common validation rules
export const validationRules = {
  required: <T,>(message: string = 'This field is required'): ValidationRule<T> => ({
    validate: (value: T) => {
      if (typeof value === 'string') return value.trim().length > 0;
      if (typeof value === 'number') return !isNaN(value);
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined;
    },
    message
  }),

  minLength: (min: number, message?: string): ValidationRule<string> => ({
    validate: (value: string) => value.length >= min,
    message: message || `Minimum ${min} characters required`
  }),

  maxLength: (max: number, message?: string): ValidationRule<string> => ({
    validate: (value: string) => value.length <= max,
    message: message || `Maximum ${max} characters allowed`
  }),

  email: (message: string = 'Invalid email address'): ValidationRule<string> => ({
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message
  }),

  min: (min: number, message?: string): ValidationRule<number> => ({
    validate: (value: number) => value >= min,
    message: message || `Minimum value is ${min}`
  }),

  max: (max: number, message?: string): ValidationRule<number> => ({
    validate: (value: number) => value <= max,
    message: message || `Maximum value is ${max}`
  }),

  pattern: (regex: RegExp, message: string): ValidationRule<string> => ({
    validate: (value: string) => regex.test(value),
    message
  }),

  custom: <T,>(validate: (value: T) => boolean, message: string): ValidationRule<T> => ({
    validate,
    message
  })
};
