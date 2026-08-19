import { useState, useCallback } from 'react';
import { useFormValidation, validationRules } from '../hooks/useFormValidation';
import { NewProductFormData } from '../types';
import { checkSkuAvailabilityAsync, createProductAsync } from '../services/apiService';
import styles from './AddProductModal.module.css';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
  categories: string[];
  brands: string[];
}

const initialFormValues: NewProductFormData = {
  name: '',
  brand: '',
  category: 'Electronics',
  price: 45000,
  sku: 'PRD-1001',
  sellerEmail: 'seller@store.pk',
  description: '',
  inStock: true
};

export function AddProductModal({
  isOpen,
  onClose,
  onProductAdded,
  categories,
  brands
}: AddProductModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skuChecking, setSkuChecking] = useState(false);
  const [skuStatusMessage, setSkuStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form validation rules using custom hook
  const rules = {
    name: [
      validationRules.required('Product Name is required'),
      validationRules.minLength(3, 'Name must be at least 3 characters')
    ],
    brand: [validationRules.required('Brand is required')],
    category: [validationRules.required('Category is required')],
    price: [
      validationRules.required('Price is required'),
      validationRules.min(1, 'Price must be greater than Rs. 0')
    ],
    sku: [
      validationRules.required('SKU Code is required'),
      validationRules.pattern(/^[A-Z]{3}-[0-9]{4}$/, 'SKU format must be 3 uppercase letters, hyphen, 4 numbers (e.g. PRD-1001)')
    ],
    sellerEmail: [
      validationRules.required('Seller Email is required'),
      validationRules.email('Please enter a valid email address')
    ],
    description: [
      validationRules.required('Description is required'),
      validationRules.minLength(10, 'Description must be at least 10 characters long')
    ]
  };

  const {
    values,
    validation,
    touched,
    isDirty,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldErrors,
    hasFieldError,
    reset
  } = useFormValidation<NewProductFormData>(initialFormValues, rules);

  // Async check for SKU availability
  const handleCheckSku = useCallback(async () => {
    if (!values.sku || hasFieldError('sku')) return;
    setSkuChecking(true);
    setSkuStatusMessage(null);
    try {
      const res = await checkSkuAvailabilityAsync(values.sku);
      if (res.available) {
        setSkuStatusMessage({ type: 'success', text: '✓ SKU code is available' });
      } else {
        setSkuStatusMessage({ type: 'error', text: res.message || 'SKU is taken' });
      }
    } catch {
      setSkuStatusMessage({ type: 'error', text: 'Failed to check SKU' });
    } finally {
      setSkuChecking(false);
    }
  }, [values.sku, hasFieldError]);

  const onSubmit = async (data: NewProductFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await createProductAsync(data);
      onProductAdded();
      reset();
      onClose();
    } catch (err: any) {
      setSubmitError(err?.message || 'Failed to create product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Add New Product</h2>
            <p className={styles.subtitle}>Validated in real-time with custom hooks & async checks</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>

        {submitError && (
          <div className={styles.errorAlert}>
            ⚠️ {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
          {/* Row 1: Name & Brand */}
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                Product Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                value={values.name}
                onChange={handleChange('name')}
                onBlur={handleBlur('name')}
                placeholder="e.g. Samsung Galaxy A54"
                className={`${styles.input} ${hasFieldError('name') ? styles.inputError : ''} ${touched.name && !hasFieldError('name') ? styles.inputSuccess : ''}`}
              />
              {hasFieldError('name') && (
                <div className={styles.errorMessage}>{getFieldErrors('name')[0]}</div>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                Brand <span className={styles.required}>*</span>
              </label>
              <select
                value={values.brand}
                onChange={handleChange('brand')}
                onBlur={handleBlur('brand')}
                className={`${styles.select} ${hasFieldError('brand') ? styles.inputError : ''}`}
              >
                <option value="">Select Brand...</option>
                {brands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              {hasFieldError('brand') && (
                <div className={styles.errorMessage}>{getFieldErrors('brand')[0]}</div>
              )}
            </div>
          </div>

          {/* Row 2: Category & Price */}
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                Category <span className={styles.required}>*</span>
              </label>
              <select
                value={values.category}
                onChange={handleChange('category')}
                onBlur={handleBlur('category')}
                className={styles.select}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                Price (PKR) <span className={styles.required}>*</span>
              </label>
              <input
                type="number"
                step="1"
                min="1"
                value={values.price}
                onChange={e => setFieldValue('price', parseInt(e.target.value) || 0)}
                onBlur={handleBlur('price')}
                className={`${styles.input} ${hasFieldError('price') ? styles.inputError : ''}`}
              />
              {hasFieldError('price') && (
                <div className={styles.errorMessage}>{getFieldErrors('price')[0]}</div>
              )}
            </div>
          </div>

          {/* Row 3: SKU with Async Verification */}
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                SKU Barcode <span className={styles.required}>*</span>
              </label>
              <div className={styles.skuInputWrapper}>
                <input
                  type="text"
                  value={values.sku}
                  onChange={handleChange('sku')}
                  onBlur={handleBlur('sku')}
                  placeholder="e.g. PRD-1001"
                  className={`${styles.input} ${hasFieldError('sku') ? styles.inputError : ''}`}
                />
                <button
                  type="button"
                  onClick={handleCheckSku}
                  disabled={skuChecking || hasFieldError('sku') || !values.sku}
                  className={styles.checkSkuBtn}
                >
                  {skuChecking ? 'Checking...' : 'Check API'}
                </button>
              </div>
              {hasFieldError('sku') ? (
                <div className={styles.errorMessage}>{getFieldErrors('sku')[0]}</div>
              ) : skuStatusMessage ? (
                <div className={skuStatusMessage.type === 'success' ? styles.successMessage : styles.errorMessage}>
                  {skuStatusMessage.text}
                </div>
              ) : null}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                Seller Email <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                value={values.sellerEmail}
                onChange={handleChange('sellerEmail')}
                onBlur={handleBlur('sellerEmail')}
                placeholder="seller@store.pk"
                className={`${styles.input} ${hasFieldError('sellerEmail') ? styles.inputError : ''}`}
              />
              {hasFieldError('sellerEmail') && (
                <div className={styles.errorMessage}>{getFieldErrors('sellerEmail')[0]}</div>
              )}
            </div>
          </div>

          {/* Row 4: Description */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              Description <span className={styles.required}>*</span>
            </label>
            <textarea
              rows={3}
              value={values.description}
              onChange={e => setFieldValue('description', e.target.value)}
              onBlur={handleBlur('description')}
              placeholder="Provide product details..."
              className={`${styles.textarea} ${hasFieldError('description') ? styles.inputError : ''}`}
            />
            {hasFieldError('description') && (
              <div className={styles.errorMessage}>{getFieldErrors('description')[0]}</div>
            )}
          </div>

          {/* Row 5: Stock Checkbox & Info */}
          <div className={styles.checkboxRow}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={values.inStock}
                onChange={e => setFieldValue('inStock', e.target.checked)}
                className={styles.checkbox}
              />
              <span>In Stock & Ready for Delivery in Pakistan</span>
            </label>

            <span className={styles.formStatus}>
              Status: {validation.isValid ? '🟢 Valid' : '🔴 Needs Attention'} ({validation.errors.length} error{validation.errors.length === 1 ? '' : 's'})
            </span>
          </div>

          {/* Footer Actions */}
          <div className={styles.actions}>
            <button
              type="button"
              onClick={reset}
              className={styles.resetBtn}
              disabled={!isDirty || isSubmitting}
            >
              Reset Form
            </button>
            <div className={styles.rightActions}>
              <button
                type="button"
                onClick={onClose}
                className={styles.cancelBtn}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!validation.isValid || isSubmitting}
                className={styles.submitBtn}
              >
                {isSubmitting ? 'Creating Product...' : 'Submit Product'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
