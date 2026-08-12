import React, { useState } from 'react';
import { Mail, Search, Plus } from 'lucide-react';

export const TeamView = ({ userProfile }) => {
  const [search, setSearch] = useState('');

  const leadName = userProfile?.name || 'Muhammad Soman Ashraf';
  const leadEmail = userProfile?.email || 'soman.ashraf@example.com';
  const leadRole = userProfile?.role || 'Lead UI/UX Engineer';

  const [teamMembers] = useState([
    { id: 1, name: leadName, email: leadEmail, role: leadRole, status: 'Online', projects: 8, avatar: leadName.split(' ').map(n => n[0]).join('').substring(0, 2) },
    { id: 2, name: 'Sarah Chen', email: 'sarah.chen@tech.co', role: 'Senior Frontend Dev', status: 'Online', projects: 6, avatar: 'SC' },
    { id: 3, name: 'Alex Rivera', email: 'alex.rivera@tech.co', role: 'Backend Lead', status: 'Offline', projects: 5, avatar: 'AR' },
    { id: 4, name: 'David Kim', email: 'david.kim@tech.co', role: 'DevOps Specialist', status: 'Online', projects: 4, avatar: 'DK' },
    { id: 5, name: 'Maria Garcia', email: 'maria.g@tech.co', role: 'Product Designer', status: 'Offline', projects: 3, avatar: 'MG' },
  ]);

  const filteredMembers = teamMembers.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.role.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
            Team Members
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Manage your workspace collaborators and roles.
          </p>
        </div>

        <button className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 dark:bg-zinc-100 px-3 py-1.5 text-xs font-medium text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white/90 transition-all shadow-2xs">
          <Plus className="h-3.5 w-3.5" />
          <span>Invite Member</span>
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
        <input 
          type="text"
          placeholder="Filter team members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-1.5 pl-8 pr-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <div key={member.id} className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-2xs">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs">
                  {member.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs">{member.name}</h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{member.role}</p>
                </div>
              </div>

              <span className={`inline-flex items-center gap-1 text-[10px] font-medium rounded-full px-2 py-0.5 ${
                member.status === 'Online' 
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' 
                  : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${member.status === 'Online' ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
                {member.status}
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
              <span className="truncate">{member.email}</span>
              <span className="shrink-0 font-medium text-zinc-700 dark:text-zinc-300">{member.projects} projects</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
