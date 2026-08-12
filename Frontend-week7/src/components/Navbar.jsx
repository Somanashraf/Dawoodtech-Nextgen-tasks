import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Sun, 
  Moon, 
  Search, 
  Bell, 
  Menu, 
  User, 
  Settings, 
  LogOut, 
  Plus,
  ChevronDown
} from 'lucide-react';

export const Navbar = ({ 
  onToggleMobileSidebar, 
  searchFilter, 
  setSearchFilter, 
  onOpenNewProjectModal,
  userProfile,
  onNavigateToSettings
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Sarah assigned you to Tailwind UI project', time: '10m ago', read: false },
    { id: 2, title: 'Weekly team meeting starts in 30 mins', time: '1h ago', read: false },
    { id: 3, title: 'Project status updated to Completed', time: '3h ago', read: true },
  ]);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsProfileOpen(false);
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Derive initials and short name from userProfile
  const initials = userProfile?.name 
    ? userProfile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'SA';
  
  const shortName = userProfile?.name
    ? userProfile.name.split(' ')[0] + (userProfile.name.split(' ')[1] ? ` ${userProfile.name.split(' ')[1][0]}.` : '')
    : 'Soman A.';

  return (
    <header className="sticky top-0 z-30 w-full border-b border-zinc-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xs transition-colors duration-150">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        
        {/* Left: Mobile Toggle & Search */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            aria-label="Toggle navigation drawer"
            className="inline-flex items-center justify-center rounded-md p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 lg:hidden transition-colors"
          >
            <Menu className="h-4 w-4" />
          </button>

          {/* Minimalist Search Box */}
          <div className="relative w-48 sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/60 py-1.5 pl-8 pr-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-400 dark:focus:border-zinc-600 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">

          {/* Action Button */}
          <button
            onClick={onOpenNewProjectModal}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-zinc-900 dark:bg-zinc-100 px-3 py-1.5 text-xs font-medium text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white/90 transition-all shadow-2xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Project</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Color Theme"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-zinc-600" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button
              type="button"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              aria-label="View notifications"
              className="relative inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 shadow-lg z-50 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Notifications</span>
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="text-[11px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium">
                      Mark read
                    </button>
                  )}
                </div>
                <div className="mt-2 space-y-1 max-h-52 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2 rounded-md bg-zinc-50 dark:bg-zinc-800/40 text-xs">
                      <p className="text-zinc-800 dark:text-zinc-200 font-medium">{n.title}</p>
                      <span className="text-[10px] text-zinc-400 mt-0.5 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 rounded-md p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="h-7 w-7 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold text-[11px]">
                {initials}
              </div>
              <span className="hidden md:inline-block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                {shortName}
              </span>
              <ChevronDown className="hidden md:inline-block h-3.5 w-3.5 text-zinc-400" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-1 shadow-lg z-50 animate-fade-in">
                <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{userProfile?.name}</p>
                  <p className="text-[11px] text-zinc-400 truncate">{userProfile?.email}</p>
                </div>
                <button 
                  onClick={() => {
                    setIsProfileOpen(false);
                    if (onNavigateToSettings) onNavigateToSettings();
                  }} 
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Settings className="h-3.5 w-3.5 text-zinc-400" /> Settings & Profile
                </button>
                <div className="border-t border-zinc-100 dark:border-zinc-800 mt-1 pt-1">
                  <button onClick={() => setIsProfileOpen(false)} className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30">
                    <LogOut className="h-3.5 w-3.5" /> Sign out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
