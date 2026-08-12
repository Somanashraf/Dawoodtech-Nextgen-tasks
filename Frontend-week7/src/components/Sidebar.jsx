import React from 'react';
import { 
  LayoutDashboard, 
  BarChart2, 
  FolderCheck, 
  Users, 
  MessageSquare, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Layers,
  X
} from 'lucide-react';

export const Sidebar = ({ 
  activeTab, 
  setActiveTab, 
  isCollapsed, 
  setIsCollapsed, 
  isMobileOpen, 
  setIsMobileOpen 
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderCheck, count: 4 },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'team', label: 'Team', icon: Users, count: 5 },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: 2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-200 lg:static lg:z-auto ${
          isCollapsed ? 'w-16' : 'w-60'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-8 w-8 shrink-0 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Layers className="h-4 w-4" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-sm text-slate-900 dark:text-white tracking-tight">
                DevPulse UI
              </span>
            )}
          </div>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 space-y-1 p-2.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen(false);
                }}
                title={isCollapsed ? item.label : undefined}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />

                {!isCollapsed && <span className="truncate flex-1 text-left">{item.label}</span>}

                {!isCollapsed && item.count !== undefined && (
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isActive 
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Toggle */}
        <div className="hidden lg:flex items-center justify-end p-3 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </aside>
    </>
  );
};
