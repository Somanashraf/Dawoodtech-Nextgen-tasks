import React, { useState } from 'react';
import { Modal } from './Modal';
import { Sparkles, FolderPlus } from 'lucide-react';

export const CreateProjectModal = ({ isOpen, onClose, onAddProject }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'UI/UX Design',
    lead: '',
    status: 'In Progress',
    progress: 35,
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.lead.trim()) return;

    onAddProject({
      ...formData,
      id: Date.now(),
    });

    // Reset form
    setFormData({
      name: '',
      category: 'UI/UX Design',
      lead: '',
      status: 'In Progress',
      progress: 35,
      description: '',
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project Card">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project Name */}
        <div>
          <label htmlFor="project-name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Project Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="project-name"
            type="text"
            required
            placeholder="e.g. Tailwind v4 Refactor"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        {/* Category & Lead Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="project-category" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              id="project-category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            >
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Frontend Dev">Frontend Dev</option>
              <option value="Backend System">Backend System</option>
              <option value="DevOps & Cloud">DevOps & Cloud</option>
              <option value="Mobile App">Mobile App</option>
            </select>
          </div>

          <div>
            <label htmlFor="project-lead" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Team Lead <span className="text-rose-500">*</span>
            </label>
            <input
              id="project-lead"
              type="text"
              required
              placeholder="e.g. Muhammad Soman"
              value={formData.lead}
              onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
        </div>

        {/* Status & Progress Slider */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="project-status" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Initial Status
            </label>
            <select
              id="project-status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="project-progress" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Progress
              </label>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {formData.progress}%
              </span>
            </div>
            <input
              id="project-progress"
              type="range"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="project-description" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Short Description
          </label>
          <textarea
            id="project-description"
            rows="3"
            placeholder="Describe project objectives and deliverables..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        {/* Form Action Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500 transition-all active:scale-95"
          >
            <FolderPlus className="h-4 w-4" />
            <span>Create Card</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
