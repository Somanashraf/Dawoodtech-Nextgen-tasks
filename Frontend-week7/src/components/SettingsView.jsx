import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { User, Shield, Moon, Sun, Save, CheckCircle2 } from 'lucide-react';

export const SettingsView = ({ userProfile, onSaveProfile }) => {
  const { theme, toggleTheme } = useTheme();
  
  const [formData, setFormData] = useState({
    name: userProfile?.name || 'Muhammad Soman Ashraf',
    email: userProfile?.email || 'soman.ashraf@example.com',
    role: userProfile?.role || 'Lead UI/UX Engineer',
    bio: userProfile?.bio || 'Building clean, modern React applications with Tailwind CSS.',
    emailNotifications: userProfile?.emailNotifications ?? true,
    twoFactor: userProfile?.twoFactor ?? true,
  });

  // Sync form data if userProfile changes
  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        email: userProfile.email || '',
        role: userProfile.role || '',
        bio: userProfile.bio || '',
        emailNotifications: userProfile.emailNotifications ?? true,
        twoFactor: userProfile.twoFactor ?? true,
      });
    }
  }, [userProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSaveProfile) {
      onSaveProfile(formData);
    }
  };

  return (
    <div className="max-w-3xl space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
          Settings & Account Profile
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Manage your personal details, workspace preferences, and application settings.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Profile Info Card */}
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <User className="h-4 w-4 text-zinc-500" />
            <h2 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Personal Profile</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="settings-name" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Full Name
              </label>
              <input 
                id="settings-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/60 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 dark:focus:border-zinc-600 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="settings-email" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Email Address
              </label>
              <input 
                id="settings-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/60 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 dark:focus:border-zinc-600 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="settings-role" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Job Title / Role
              </label>
              <input 
                id="settings-role"
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/60 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 dark:focus:border-zinc-600 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="settings-bio" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Short Bio
            </label>
            <textarea 
              id="settings-bio"
              rows="3"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/60 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 dark:focus:border-zinc-600 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Theme Card */}
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Interface Appearance</p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Current theme: <span className="font-semibold uppercase">{theme}</span></p>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-3.5 w-3.5 text-amber-400" /> : <Moon className="h-3.5 w-3.5 text-zinc-600" />}
              <span>Toggle Theme</span>
            </button>
          </div>
        </div>

        {/* Security Preferences */}
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2.5">
            <Shield className="h-4 w-4 text-zinc-500" />
            <h2 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Security & Alerts</h2>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Email Notifications</p>
                <p className="text-[11px] text-zinc-400">Get notified when team members update assigned project status.</p>
              </div>
              <input 
                type="checkbox"
                checked={formData.emailNotifications}
                onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                className="h-4 w-4 rounded border-zinc-300 accent-zinc-900 dark:accent-zinc-100 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div>
                <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Two-Factor Authentication</p>
                <p className="text-[11px] text-zinc-400">Add an extra layer of security to your workspace account.</p>
              </div>
              <input 
                type="checkbox"
                checked={formData.twoFactor}
                onChange={(e) => setFormData({ ...formData, twoFactor: e.target.checked })}
                className="h-4 w-4 rounded border-zinc-300 accent-zinc-900 dark:accent-zinc-100 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Form Action */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 dark:bg-zinc-100 px-4 py-2 text-xs font-medium text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white/90 transition-all shadow-2xs"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Settings Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
