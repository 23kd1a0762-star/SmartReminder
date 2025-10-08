import { Home, Calendar, Heart, Settings } from 'lucide-react';
import { ViewMode } from '../../types';

interface NavigationProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'dashboard' as ViewMode, icon: Home, label: 'Dashboard' },
    { id: 'calendar' as ViewMode, icon: Calendar, label: 'Calendar' },
    { id: 'interests' as ViewMode, icon: Heart, label: 'Interests' },
    { id: 'settings' as ViewMode, icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className="bg-slate-900/50 backdrop-blur-lg border-t border-slate-700/50 fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-purple-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
