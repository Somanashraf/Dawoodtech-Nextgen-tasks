import React, { useState } from 'react';
import { Folder, Trash2, Plus } from 'lucide-react';

export const ProjectTable = ({ 
  projects, 
  onDeleteProject, 
  searchQuery, 
  onOpenModal 
}) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = selectedFilter === 'All' || project.status === selectedFilter;
    const matchesSearch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.lead.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Completed
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 text-[11px] font-medium text-indigo-700 dark:text-indigo-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> In Progress
          </span>
        );
      case 'On Hold':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" /> On Hold
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <div>
          <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
            Workspace Projects
          </h3>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Showing {filteredProjects.length} of {projects.length} active items
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-md bg-zinc-100 dark:bg-zinc-800/80 p-0.5">
            {['All', 'In Progress', 'Completed', 'On Hold'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`rounded px-2.5 py-1 text-[11px] font-medium transition-all ${
                  selectedFilter === filter
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-1 rounded-md bg-zinc-900 dark:bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white/90 transition-all"
          >
            <Plus className="h-3 w-3" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto">
        {filteredProjects.length === 0 ? (
          <div className="py-10 text-center text-xs text-zinc-400">
            No matching projects found.
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800 text-zinc-400 font-medium">
                <th className="py-2 px-2">Project</th>
                <th className="py-2 px-2">Category</th>
                <th className="py-2 px-2">Lead</th>
                <th className="py-2 px-2">Status</th>
                <th className="py-2 px-2">Completion</th>
                <th className="py-2 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 px-2">
                    <div>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">{project.name}</p>
                      <p className="text-[11px] text-zinc-400 truncate max-w-xs">{project.description}</p>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-zinc-600 dark:text-zinc-400 text-[11px]">{project.category}</td>
                  <td className="py-3 px-2 font-medium text-zinc-700 dark:text-zinc-300">{project.lead}</td>
                  <td className="py-3 px-2">{getStatusBadge(project.status)}</td>
                  <td className="py-3 px-2 min-w-[100px]">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-zinc-400 font-medium">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <button
                      onClick={() => onDeleteProject(project.id)}
                      className="p-1 rounded text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      title="Delete item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
