import { useState } from 'react';
import { useNotes } from '../../contexts/NotesContext';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';

const AddNoteModal = ({ isOpen, onClose }) => {
  const { addNote } = useNotes();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    color: 'yellow',
  });
  const [errors, setErrors] = useState({});

  const colors = [
    { value: 'yellow', label: 'Yellow', class: 'bg-yellow-100 border-yellow-300' },
    { value: 'blue', label: 'Blue', class: 'bg-blue-100 border-blue-300' },
    { value: 'green', label: 'Green', class: 'bg-green-100 border-green-300' },
    { value: 'pink', label: 'Pink', class: 'bg-pink-100 border-pink-300' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-100 border-purple-300' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleColorChange = (color) => {
    setFormData(prev => ({ ...prev, color }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addNote(formData);
      setFormData({
        title: '',
        content: '',
        color: 'yellow',
      });
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      content: '',
      color: 'yellow',
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Note"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Create Note
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Note Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter note title"
          error={errors.title}
          autoFocus
        />

        <TextArea
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your note here..."
          rows={6}
          error={errors.content}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note Color
          </label>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => handleColorChange(color.value)}
                className={`w-10 h-10 rounded-lg border-2 transition-all ${color.class} ${
                  formData.color === color.value
                    ? 'ring-2 ring-offset-2 ring-primary-500 scale-110'
                    : 'hover:scale-105'
                }`}
                title={color.label}
              />
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddNoteModal;
