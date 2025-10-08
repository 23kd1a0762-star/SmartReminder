import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { getMonthDays, getDaysUntil } from '../../utils/dateUtils';

export function CalendarView() {
  const { autoReminders, manualReminders } = useData();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthDays = getMonthDays(year, month);

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getRemindersForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return [
      ...autoReminders.filter(r => !r.isDismissed && new Date(r.eventDate).toISOString().split('T')[0] === dateStr),
      ...manualReminders.filter(r => !r.isDone && new Date(r.reminderDate).toISOString().split('T')[0] === dateStr)
    ];
  };

  const getDotColor = (date: Date) => {
    const reminders = getRemindersForDate(date);
    if (reminders.length === 0) return null;

    const days = getDaysUntil(date);
    if (days <= 3 && days >= 0) return 'bg-red-500';
    if (days <= 7 && days >= 0) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const isCurrentMonth = (date: Date) => date.getMonth() === month;
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const monthName = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-b border-slate-700/50 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-2">Calendar</h2>
          <p className="text-slate-300">View all your reminders in one place</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <h3 className="text-xl font-bold text-white">{monthName}</h3>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-semibold text-slate-400 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {monthDays.map((date, index) => {
              const reminders = getRemindersForDate(date);
              const dotColor = getDotColor(date);
              const isCurrent = isCurrentMonth(date);
              const today = isToday(date);

              return (
                <button
                  key={index}
                  className={`aspect-square p-2 rounded-lg transition-all relative ${
                    today
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold'
                      : isCurrent
                      ? 'bg-slate-700/30 hover:bg-slate-700/50 text-white'
                      : 'text-slate-600'
                  }`}
                  title={reminders.length > 0 ? `${reminders.length} reminder(s)` : undefined}
                >
                  <span className="block text-center">{date.getDate()}</span>
                  {dotColor && (
                    <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${dotColor}`} />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-slate-300">Urgent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-slate-300">This Week</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-slate-300">Future</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
