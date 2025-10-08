export type Category = 'Education' | 'Entertainment' | 'Sports' | 'Tech' | 'Career' | 'Personal';

export type RepeatPattern = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export type Confidence = 'high' | 'medium' | 'low';

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface Interest {
  id: string;
  userId: string;
  category: Category;
  name: string;
  sourceUrl?: string;
  lastFetched?: Date;
  isActive: boolean;
  notifyBefore: number[];
  createdAt: Date;
}

export interface AutoReminder {
  id: string;
  interestId: string;
  interestName: string;
  category: Category;
  title: string;
  description?: string;
  eventDate: Date;
  eventTime?: string;
  sourceUrl?: string;
  confidence: Confidence;
  isDismissed: boolean;
  createdAt: Date;
}

export interface ManualReminder {
  id: string;
  userId: string;
  title: string;
  description?: string;
  reminderDate: Date;
  reminderTime?: string;
  repeatPattern?: RepeatPattern;
  notifyBefore: number;
  isDone: boolean;
  createdAt: Date;
}

export interface UserSettings {
  id: string;
  userId: string;
  theme: 'dark' | 'light';
  language: 'en' | 'hi';
  quietHoursStart?: string;
  quietHoursEnd?: string;
  emailDigest: boolean;
  pushEnabled: boolean;
}

export type ViewMode = 'dashboard' | 'calendar' | 'interests' | 'settings';
