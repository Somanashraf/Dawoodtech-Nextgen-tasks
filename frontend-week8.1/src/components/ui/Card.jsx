/**
 * Reusable Card Component
 * Provides consistent styling for content containers
 */
const Card = ({ 
  children, 
  className = '', 
  hover = false,
  padding = 'normal',
  ...props 
}) => {
  const baseStyles = 'bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 transition-all';
  const hoverStyles = hover ? 'hover:shadow-2xl hover:border-indigo-200 hover:-translate-y-1' : '';
  
  const paddingStyles = {
    none: '',
    small: 'p-4',
    normal: 'p-6',
    large: 'p-8',
  };

  const paddingClass = paddingStyles[padding] || paddingStyles.normal;

  return (
    <div 
      className={`${baseStyles} ${hoverStyles} ${paddingClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
