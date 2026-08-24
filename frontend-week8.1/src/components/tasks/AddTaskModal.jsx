import { useState } from 'react';
import { useTask } from '../../contexts/TaskContext';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Select from '../ui/Select';
import Button from '../ui/Button';

const AddTaskModal = ({ isOpen, onClose }) => {
  const { addTask } = useTask();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
  });
  const [errors, setErrors] = useState({});

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addTask(formData);
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
      });
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Task"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add Task
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Task Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          error={errors.title}
          autoFocus
        />

        <TextArea
          label="Description (Optional)"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add more details about this task..."
          rows={3}
        />

        <Select
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          options={priorityOptions}
        />
      </form>
    </Modal>
  );
};

export default AddTaskModal;
