import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Interest, AutoReminder, ManualReminder, UserSettings } from '../types';
import { useAuth } from './AuthContext';
import { generateMockData } from '../utils/mockData';

interface DataContextType {
  interests: Interest[];
  autoReminders: AutoReminder[];
  manualReminders: ManualReminder[];
  settings: UserSettings | null;
  addInterest: (interest: Omit<Interest, 'id' | 'userId' | 'createdAt'>) => void;
  updateInterest: (id: string, updates: Partial<Interest>) => void;
  deleteInterest: (id: string) => void;
  addManualReminder: (reminder: Omit<ManualReminder, 'id' | 'userId' | 'createdAt' | 'isDone'>) => void;
  updateManualReminder: (id: string, updates: Partial<ManualReminder>) => void;
  deleteManualReminder: (id: string) => void;
  dismissAutoReminder: (id: string) => void;
  updateSettings: (updates: Partial<UserSettings>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [interests, setInterests] = useState<Interest[]>([]);
  const [autoReminders, setAutoReminders] = useState<AutoReminder[]>([]);
  const [manualReminders, setManualReminders] = useState<ManualReminder[]>([]);
  const [settings, setSettings] = useState<UserSettings | null>(null);

  useEffect(() => {
    if (user) {
      const mockData = generateMockData(user.id);
      setInterests(mockData.interests);
      setAutoReminders(mockData.autoReminders);
      setManualReminders(mockData.manualReminders);
      setSettings(mockData.settings);
    } else {
      setInterests([]);
      setAutoReminders([]);
      setManualReminders([]);
      setSettings(null);
    }
  }, [user]);

  const addInterest = (interest: Omit<Interest, 'id' | 'userId' | 'createdAt'>) => {
    const newInterest: Interest = {
      ...interest,
      id: Math.random().toString(36).substr(2, 9),
      userId: user!.id,
      createdAt: new Date()
    };
    setInterests(prev => [...prev, newInterest]);
  };

  const updateInterest = (id: string, updates: Partial<Interest>) => {
    setInterests(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const deleteInterest = (id: string) => {
    setInterests(prev => prev.filter(i => i.id !== id));
    setAutoReminders(prev => prev.filter(r => r.interestId !== id));
  };

  const addManualReminder = (reminder: Omit<ManualReminder, 'id' | 'userId' | 'createdAt' | 'isDone'>) => {
    const newReminder: ManualReminder = {
      ...reminder,
      id: Math.random().toString(36).substr(2, 9),
      userId: user!.id,
      isDone: false,
      createdAt: new Date()
    };
    setManualReminders(prev => [...prev, newReminder]);
  };

  const updateManualReminder = (id: string, updates: Partial<ManualReminder>) => {
    setManualReminders(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const deleteManualReminder = (id: string) => {
    setManualReminders(prev => prev.filter(r => r.id !== id));
  };

  const dismissAutoReminder = (id: string) => {
    setAutoReminders(prev => prev.map(r => r.id === id ? { ...r, isDismissed: true } : r));
  };

  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <DataContext.Provider
      value={{
        interests,
        autoReminders,
        manualReminders,
        settings,
        addInterest,
        updateInterest,
        deleteInterest,
        addManualReminder,
        updateManualReminder,
        deleteManualReminder,
        dismissAutoReminder,
        updateSettings
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
