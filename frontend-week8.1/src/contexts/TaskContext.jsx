import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString(),
      title: task.title,
      description: task.description || '',
      priority: task.priority || 'medium',
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const getTaskStats = () => {
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      pending: tasks.filter(t => !t.completed).length,
      highPriority: tasks.filter(t => t.priority === 'high' && !t.completed).length,
    };
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted,
    getTaskStats,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
