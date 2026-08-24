/**
 * Reusable EmptyState Component
 * Displays when no data is available
 */
const EmptyState = ({ 
  icon: Icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      {Icon && (
        <div className="mb-4 text-gray-400">
          <Icon size={64} strokeWidth={1.5} />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-gray-500 mb-6 max-w-sm">
          {description}
        </p>
      )}
      {action && action}
    </div>
  );
};

export default EmptyState;
