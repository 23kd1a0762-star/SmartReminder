import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { LoginForm } from './components/Auth/LoginForm';
import { Header } from './components/Layout/Header';
import { Navigation } from './components/Layout/Navigation';
import { Dashboard } from './components/Dashboard/Dashboard';
import { CalendarView } from './components/Calendar/CalendarView';
import { InterestsView } from './components/Interests/InterestsView';
import { SettingsView } from './components/Settings/SettingsView';
import { ViewMode } from './types';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading RemindAI...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <DataProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Header />
        <main className="min-h-[calc(100vh-4rem)]">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'calendar' && <CalendarView />}
          {currentView === 'interests' && <InterestsView />}
          {currentView === 'settings' && <SettingsView />}
        </main>
        <Navigation currentView={currentView} onViewChange={setCurrentView} />
      </div>
    </DataProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
