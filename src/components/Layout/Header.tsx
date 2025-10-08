import { Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-slate-900/50 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">RemindAI</h1>
              <p className="text-xs text-slate-400">Smart Reminder System</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg">
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-white">{user?.username}</span>
            </div>
            <button
              onClick={signOut}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors group"
              title="Sign out"
            >
              <LogOut className="w-5 h-5 text-slate-400 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
