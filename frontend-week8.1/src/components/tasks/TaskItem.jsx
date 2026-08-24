import { useState } from 'react';
import { useTask } from '../../contexts/TaskContext';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import EditTaskModal from './EditTaskModal';
import { Check, Circle, Pencil, Trash2, Clock } from 'lucide-react';

const TaskItem = ({ task }) => {
  const { toggleTask, deleteTask } = useTask();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleToggle = () => {
    toggleTask(task.id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  return (
    <>
      <Card 
        hover 
        padding="small"
        className={`transition-all duration-200 ${
          task.completed ? 'opacity-60 bg-gray-50' : ''
        }`}
      >
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <button
            onClick={handleToggle}
            className="flex-shrink-0 mt-1 transition-colors"
          >
            {task.completed ? (
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                <Check size={16} />
              </div>
            ) : (
              <Circle 
                size={24} 
                className="text-gray-400 hover:text-primary-600 transition-colors"
              />
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 
                  className={`font-medium text-gray-900 ${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {task.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={task.priority}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={12} />
                    {formatDate(task.createdAt)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditModalOpen(true)}
                  className="p-2"
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleDelete}
                  className="p-2"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Edit Modal */}
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
      />
    </>
  );
};

export default TaskItem;
