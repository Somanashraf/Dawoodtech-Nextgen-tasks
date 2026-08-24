import { useState } from 'react';
import { useTask } from '../../contexts/TaskContext';
import TaskItem from './TaskItem';
import AddTaskModal from './AddTaskModal';
import EmptyState from '../ui/EmptyState';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { ListTodo, Plus, Filter, Trash2 } from 'lucide-react';

const TaskList = () => {
  const { tasks, clearCompleted, getTaskStats } = useTask();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // all, active, completed

  const stats = getTaskStats();

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Sort by priority: high > medium > low
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-500 mt-1">
            {stats.pending} pending, {stats.completed} completed
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} size="md">
          <Plus size={20} />
          Add Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card padding="small" className="text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-500">Total Tasks</div>
        </Card>
        <Card padding="small" className="text-center">
          <div className="text-2xl font-bold text-primary-600">{stats.pending}</div>
          <div className="text-sm text-gray-500">Pending</div>
        </Card>
        <Card padding="small" className="text-center">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-gray-500">Completed</div>
        </Card>
        <Card padding="small" className="text-center">
          <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
          <div className="text-sm text-gray-500">High Priority</div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter size={20} className="text-gray-400" />
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All ({tasks.length})
          </Button>
          <Button
            variant={filter === 'active' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('active')}
          >
            Active ({stats.pending})
          </Button>
          <Button
            variant={filter === 'completed' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Completed ({stats.completed})
          </Button>
        </div>
        {stats.completed > 0 && (
          <Button
            variant="danger"
            size="sm"
            onClick={clearCompleted}
            className="ml-auto"
          >
            <Trash2 size={16} />
            Clear Completed
          </Button>
        )}
      </div>

      {/* Task List */}
      {sortedTasks.length === 0 ? (
        <EmptyState
          icon={ListTodo}
          title={
            filter === 'all'
              ? 'No tasks yet'
              : filter === 'active'
              ? 'No active tasks'
              : 'No completed tasks'
          }
          description={
            filter === 'all'
              ? 'Get started by adding your first task'
              : filter === 'active'
              ? 'All tasks are completed!'
              : 'Complete some tasks to see them here'
          }
          action={
            filter === 'all' && (
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus size={20} />
                Add Your First Task
              </Button>
            )
          }
        />
      ) : (
        <div className="space-y-3">
          {sortedTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default TaskList;
