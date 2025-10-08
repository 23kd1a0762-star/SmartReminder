import { Interest, AutoReminder, ManualReminder, UserSettings } from '../types';

export function generateMockData(userId: string) {
  const now = new Date();

  const interests: Interest[] = [
    {
      id: 'int1',
      userId,
      category: 'Entertainment',
      name: 'One Piece',
      sourceUrl: 'https://myanimelist.net/anime/21',
      isActive: true,
      notifyBefore: [7, 3, 1],
      createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'int2',
      userId,
      category: 'Education',
      name: 'JEE Main 2025',
      sourceUrl: 'https://jeemain.nta.nic.in',
      isActive: true,
      notifyBefore: [30, 14, 7, 1],
      createdAt: new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'int3',
      userId,
      category: 'Sports',
      name: 'IPL 2025',
      sourceUrl: 'https://www.iplt20.com',
      isActive: true,
      notifyBefore: [7, 1],
      createdAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'int4',
      userId,
      category: 'Tech',
      name: 'iPhone 16 Launch',
      sourceUrl: 'https://www.apple.com',
      isActive: true,
      notifyBefore: [14, 7, 1],
      createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)
    }
  ];

  const autoReminders: AutoReminder[] = [
    {
      id: 'auto1',
      interestId: 'int1',
      interestName: 'One Piece',
      category: 'Entertainment',
      title: 'One Piece Episode 1090',
      description: 'New episode release on Crunchyroll',
      eventDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
      eventTime: '09:00',
      sourceUrl: 'https://www.crunchyroll.com/one-piece',
      confidence: 'high',
      isDismissed: false,
      createdAt: new Date()
    },
    {
      id: 'auto2',
      interestId: 'int2',
      interestName: 'JEE Main 2025',
      category: 'Education',
      title: 'JEE Main Registration Ends',
      description: 'Last date to complete application form',
      eventDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
      sourceUrl: 'https://jeemain.nta.nic.in',
      confidence: 'high',
      isDismissed: false,
      createdAt: new Date()
    },
    {
      id: 'auto3',
      interestId: 'int3',
      interestName: 'IPL 2025',
      category: 'Sports',
      title: 'India vs Australia ODI',
      description: '3rd ODI Match at Melbourne Cricket Ground',
      eventDate: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000),
      eventTime: '19:30',
      sourceUrl: 'https://www.espncricinfo.com',
      confidence: 'high',
      isDismissed: false,
      createdAt: new Date()
    },
    {
      id: 'auto4',
      interestId: 'int2',
      interestName: 'JEE Main 2025',
      category: 'Education',
      title: 'JEE Main Admit Card Release',
      description: 'Download hall ticket from official website',
      eventDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
      confidence: 'medium',
      isDismissed: false,
      createdAt: new Date()
    },
    {
      id: 'auto5',
      interestId: 'int4',
      interestName: 'iPhone 16 Launch',
      category: 'Tech',
      title: 'iPhone 16 Pre-orders Begin',
      description: 'Pre-order the new iPhone 16 series',
      eventDate: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000),
      eventTime: '17:30',
      sourceUrl: 'https://www.apple.com/in',
      confidence: 'medium',
      isDismissed: false,
      createdAt: new Date()
    }
  ];

  const manualReminders: ManualReminder[] = [
    {
      id: 'manual1',
      userId,
      title: "Mom's Birthday",
      description: 'Buy birthday cake and gift',
      reminderDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
      notifyBefore: 1,
      repeatPattern: 'yearly',
      isDone: false,
      createdAt: new Date()
    },
    {
      id: 'manual2',
      userId,
      title: 'Electricity Bill Payment',
      description: 'Pay monthly electricity bill online',
      reminderDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
      notifyBefore: 3,
      repeatPattern: 'monthly',
      isDone: false,
      createdAt: new Date()
    },
    {
      id: 'manual3',
      userId,
      title: 'Doctor Appointment',
      description: 'Annual health checkup at City Hospital',
      reminderDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      reminderTime: '10:30',
      notifyBefore: 1,
      isDone: false,
      createdAt: new Date()
    }
  ];

  const settings: UserSettings = {
    id: 'settings1',
    userId,
    theme: 'dark',
    language: 'en',
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
    emailDigest: true,
    pushEnabled: true
  };

  return { interests, autoReminders, manualReminders, settings };
}
