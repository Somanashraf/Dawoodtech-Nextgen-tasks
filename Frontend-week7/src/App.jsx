import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { StatCard } from './components/StatCard';
import { AnalyticsChartCard } from './components/AnalyticsChartCard';
import { RecentActivityCard } from './components/RecentActivityCard';
import { ProjectTable } from './components/ProjectTable';
import { CreateProjectModal } from './components/CreateProjectModal';
import { AnalyticsView } from './components/AnalyticsView';
import { TeamView } from './components/TeamView';
import { MessagesView } from './components/MessagesView';
import { SettingsView } from './components/SettingsView';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Activity, 
  Plus,
  CheckCircle2
} from 'lucide-react';

function DashboardContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Global user profile state with localStorage persistence
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse userProfile from localStorage', e);
      }
    }
    return {
      name: 'Muhammad Soman Ashraf',
      email: 'soman.ashraf@example.com',
      role: 'Lead UI/UX Engineer',
      bio: 'Building clean, modern React applications with Tailwind CSS.',
      emailNotifications: true,
      twoFactor: true,
    };
  });

  // Projects state with localStorage persistence
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('dashboard_projects');
    if (savedProjects) {
      try {
        return JSON.parse(savedProjects);
      } catch (e) {
        console.error('Failed to parse projects from localStorage', e);
      }
    }
    return [
      {
        id: 1,
        name: 'Tailwind UI Dashboard Redesign',
        category: 'UI/UX Design',
        lead: 'Muhammad Soman',
        status: 'In Progress',
        progress: 75,
        description: 'Refactor React app with responsive grids, card components, and dark mode toggle.'
      },
      {
        id: 2,
        name: 'React 19 Core Upgrade',
        category: 'Frontend Dev',
        lead: 'Sarah Chen',
        status: 'Completed',
        progress: 100,
        description: 'Migrate state management to standard hooks and optimize bundle size.'
      },
      {
        id: 3,
        name: 'Real-time Analytics Pipeline',
        category: 'Backend System',
        lead: 'Alex Rivera',
        status: 'In Progress',
        progress: 40,
        description: 'Stream metrics data via WebSocket with automated alert thresholds.'
      },
      {
        id: 4,
        name: 'OAuth2 Authentication Engine',
        category: 'DevOps & Cloud',
        lead: 'David Kim',
        status: 'On Hold',
        progress: 20,
        description: 'Implement multi-tenant SSO auth with PKCE verification flow.'
      },
    ];
  });

  // Save projects to localStorage on change
  useEffect(() => {
    localStorage.setItem('dashboard_projects', JSON.stringify(projects));
  }, [projects]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    showToast('Profile settings saved and applied!');
  };

  const handleAddProject = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    showToast(`Project "${newProject.name}" created!`);
  };

  const handleDeleteProject = (projectId) => {
    const projToDelete = projects.find(p => p.id === projectId);
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    if (projToDelete) {
      showToast(`Project "${projToDelete.name}" removed.`);
    }
  };

  // Render view based on activeTab
  const renderActiveView = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsView />;
      case 'projects':
        return (
          <div className="space-y-5 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
                  Projects & Workspace Cards
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Manage active deliverables, progress metrics, and task statuses.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 dark:bg-zinc-100 px-3.5 py-1.5 text-xs font-medium text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white/90 transition-all shadow-2xs"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Create New Project</span>
              </button>
            </div>
            <ProjectTable
              projects={projects}
              onDeleteProject={handleDeleteProject}
              searchQuery={searchFilter}
              onOpenModal={() => setIsModalOpen(true)}
            />
          </div>
        );
      case 'team':
        return <TeamView userProfile={userProfile} />;
      case 'messages':
        return <MessagesView userProfile={userProfile} />;
      case 'settings':
        return <SettingsView userProfile={userProfile} onSaveProfile={handleSaveProfile} />;
      case 'dashboard':
      default:
        return (
          <div className="space-y-5 animate-fade-in">
            {/* Dashboard Welcome Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
                  Overview
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Welcome back, <span className="font-semibold text-zinc-800 dark:text-zinc-200">{userProfile?.name}</span>. Here's your workspace summary.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 dark:bg-zinc-100 px-3.5 py-1.5 text-xs font-medium text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white/90 transition-all shadow-2xs"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Create Project</span>
                </button>
              </div>
            </div>

            {/* Responsive KPI Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Revenue"
                value="$128,450.00"
                change="+14.2%"
                isPositive={true}
                icon={DollarSign}
                description="Compared to last month"
              />
              <StatCard
                title="Active Users"
                value="24,890"
                change="+8.7%"
                isPositive={true}
                icon={Users}
                description="1,240 new this week"
              />
              <StatCard
                title="Conversion Rate"
                value="3.84%"
                change="-1.2%"
                isPositive={false}
                icon={TrendingUp}
                description="Average checkout conversion"
              />
              <StatCard
                title="System Uptime"
                value="99.98%"
                change="+0.02%"
                isPositive={true}
                icon={Activity}
                description="All services operational"
              />
            </div>

            {/* Middle Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2">
                <AnalyticsChartCard />
              </div>
              <div className="lg:col-span-1">
                <RecentActivityCard />
              </div>
            </div>

            {/* Bottom Project Table Grid */}
            <div>
              <ProjectTable
                projects={projects}
                onDeleteProject={handleDeleteProject}
                searchQuery={searchFilter}
                onOpenModal={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors duration-150">
      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Main Content Body */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Navbar */}
          <Navbar
            onToggleMobileSidebar={() => setIsMobileOpen(true)}
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
            onOpenNewProjectModal={() => setIsModalOpen(true)}
            userProfile={userProfile}
            onNavigateToSettings={() => setActiveTab('settings')}
          />

          {/* Dynamic Page Container */}
          <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
            {renderActiveView()}
          </main>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-3.5 py-2.5 text-xs font-medium shadow-xl border border-zinc-700 dark:border-zinc-200 animate-fade-in">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />
              <span>{toastMessage}</span>
            </div>
          )}
        </div>
      </div>

      {/* Accessible Create Project Form Modal */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
}
