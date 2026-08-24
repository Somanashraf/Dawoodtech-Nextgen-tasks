import { useApp } from '../../contexts/AppContext';
import { useTask } from '../../contexts/TaskContext';
import { useNotes } from '../../contexts/NotesContext';
import { CheckSquare, StickyNote, Timer, X, TrendingUp } from 'lucide-react';

const Sidebar = () => {
  const { activeView, setActiveView, sidebarOpen, toggleSidebar } = useApp();
  const { getTaskStats } = useTask();
  const { notes } = useNotes();
  
  const stats = getTaskStats();

  const menuItems = [
    {
      id: 'tasks',
      label: 'Tasks',
      icon: CheckSquare,
      badge: stats.pending,
      badgeColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'notes',
      label: 'Notes',
      icon: StickyNote,
      badge: notes.length,
      badgeColor: 'bg-gradient-to-r from-amber-500 to-orange-500',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      id: 'timer',
      label: 'Timer',
      icon: Timer,
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const handleItemClick = (id) => {
    setActiveView(id);
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-all"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-gradient-to-b from-slate-50 to-slate-100 border-r border-slate-200 transition-all duration-300 z-50 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${sidebarOpen ? 'w-72' : 'w-0 lg:w-72'}`}
      >
        <div className="flex flex-col h-full">
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
            <span className="font-bold text-slate-900 text-lg">Menu</span>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-xl hover:bg-slate-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 px-3">
              <TrendingUp size={14} />
              Navigation
            </div>
            
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`group w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] ${
                    isActive
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-xl shadow-${item.gradient}/50`
                      : 'text-slate-600 hover:bg-white hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-white/20' 
                        : 'bg-slate-100 group-hover:bg-gradient-to-r group-hover:' + item.gradient + ' group-hover:text-white'
                    }`}>
                      <Icon size={20} />
                    </div>
                    <span className="font-semibold">{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                        isActive ? 'bg-white/30' : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-200">
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-5 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-white/30 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-white" size={18} />
                  </div>
                  <h3 className="font-bold text-white text-lg">
                    Keep Going! 🚀
                  </h3>
                </div>
                <p className="text-sm text-white/90 font-medium">
                  {stats.pending > 0 
                    ? `You have ${stats.pending} task${stats.pending > 1 ? 's' : ''} to complete today!`
                    : 'All tasks completed! Great job! 🎉'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
