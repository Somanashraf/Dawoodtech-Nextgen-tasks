import { useApp } from '../../contexts/AppContext';
import { Menu, X, Sparkles } from 'lucide-react';

const Header = () => {
  const { sidebarOpen, toggleSidebar } = useApp();

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 border-b border-purple-700 sticky top-0 z-40 shadow-lg">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-xl hover:bg-white/20 transition-all text-white backdrop-blur-sm"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl transform hover:scale-110 transition-transform">
                P
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-300 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">Productivity Hub</h1>
              <p className="text-xs text-purple-100 hidden sm:block font-medium">
                ✨ Manage tasks, notes & time effectively
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-glow"></div>
            <span className="text-sm font-medium text-white">All systems online</span>
          </div>
          
          <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-2 border border-white/20">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
              MS
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
