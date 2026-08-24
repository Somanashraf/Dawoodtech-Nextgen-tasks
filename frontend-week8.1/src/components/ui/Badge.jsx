/**
 * Reusable Badge Component
 * For displaying status, priority, or category labels
 */
const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const baseStyles = 'badge inline-flex items-center font-semibold rounded-full shadow-sm';
  
  const variants = {
    default: 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800',
    primary: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-800',
    success: 'bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-800',
    warning: 'bg-gradient-to-r from-amber-100 to-yellow-100 text-yellow-800',
    danger: 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800',
    low: 'bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-800',
    medium: 'bg-gradient-to-r from-amber-100 to-yellow-100 text-yellow-800',
    high: 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  };

  const variantClass = variants[variant] || variants.default;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <span className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
