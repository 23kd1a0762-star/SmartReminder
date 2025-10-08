export function getDaysUntil(date: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  const diffTime = target.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

export function getRelativeTimeString(date: Date): string {
  const days = getDaysUntil(date);

  if (days < 0) return 'Past';
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days < 7) return `In ${days} days`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return `In ${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
  }
  const months = Math.floor(days / 30);
  return `In ${months} ${months === 1 ? 'month' : 'months'}`;
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

export function isThisWeek(date: Date): boolean {
  const days = getDaysUntil(date);
  return days >= 0 && days <= 7;
}

export function getMonthDays(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];

  const startDay = firstDay.getDay();
  for (let i = 0; i < startDay; i++) {
    const prevDate = new Date(year, month, -i);
    days.unshift(prevDate);
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Education: 'bg-blue-500',
    Entertainment: 'bg-pink-500',
    Sports: 'bg-green-500',
    Tech: 'bg-purple-500',
    Career: 'bg-orange-500',
    Personal: 'bg-teal-500'
  };
  return colors[category] || 'bg-gray-500';
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    Education: '🎓',
    Entertainment: '🎬',
    Sports: '⚽',
    Tech: '📱',
    Career: '💼',
    Personal: '📌'
  };
  return icons[category] || '📋';
}
