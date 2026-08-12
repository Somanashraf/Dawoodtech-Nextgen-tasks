import React from 'react';
import { GitCommit, AlertTriangle, ShieldCheck, UserPlus, Clock, ArrowRight } from 'lucide-react';

export const RecentActivityCard = () => {
  const activities = [
    {
      id: 1,
      user: 'Sarah Chen',
      avatarBg: 'bg-indigo-500',
      action: 'merged pull request',
      target: '#142 Tailwind v4 migration',
      time: '12 minutes ago',
      icon: GitCommit,
      tag: 'Code',
      tagColor: 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400',
    },
    {
      id: 2,
      user: 'Alex Rivera',
      avatarBg: 'bg-emerald-500',
      action: 'invited new member',
      target: 'maria.g@tech.co',
      time: '45 minutes ago',
      icon: UserPlus,
      tag: 'Team',
      tagColor: 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 3,
      user: 'System Bot',
      avatarBg: 'bg-amber-500',
      action: 'triggered alert',
      target: 'API Response Latency > 200ms',
      time: '2 hours ago',
      icon: AlertTriangle,
      tag: 'System',
      tagColor: 'bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400',
    },
    {
      id: 4,
      user: 'David Kim',
      avatarBg: 'bg-violet-500',
      action: 'passed security audit',
      target: 'OAuth2 SSL verification',
      time: '4 hours ago',
      icon: ShieldCheck,
      tag: 'Security',
      tagColor: 'bg-violet-50 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400',
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
            Recent Team Activity
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Audit logs and team workflow streams
          </p>
        </div>
        <button 
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <span>View All</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Activity Timeline List */}
      <div className="mt-4 space-y-4">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="group flex items-start gap-3 rounded-xl p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              {/* User Avatar */}
              <div className={`h-8 w-8 shrink-0 rounded-full ${act.avatarBg} flex items-center justify-center text-white font-bold text-xs shadow-xs`}>
                {act.user.split(' ').map(n => n[0]).join('')}
              </div>

              {/* Activity Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-slate-900 dark:text-slate-100 truncate">
                    <span className="font-bold">{act.user}</span>{' '}
                    <span className="text-slate-500 dark:text-slate-400">{act.action}</span>{' '}
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{act.target}</span>
                  </p>
                  <span className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold ${act.tagColor}`}>
                    {act.tag}
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Clock className="h-3 w-3" />
                  <span>{act.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
