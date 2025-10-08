import { Plus, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { ReminderCard } from './ReminderCard';
import { getDaysUntil } from '../../utils/dateUtils';
import { AddReminderModal } from './AddReminderModal';

export function Dashboard() {
  const { autoReminders, manualReminders, dismissAutoReminder, updateManualReminder } = useData();
  const [showAddModal, setShowAddModal] = useState(false);

  const allReminders = [
    ...autoReminders
      .filter(r => !r.isDismissed)
      .map(r => ({ ...r, date: new Date(r.eventDate), type: 'auto' as const })),
    ...manualReminders
      .filter(r => !r.isDone)
      .map(r => ({ ...r, date: new Date(r.reminderDate), type: 'manual' as const }))
  ].sort((a, b) => a.date.getTime() - b.date.getTime());

  const urgentReminders = allReminders.filter(r => getDaysUntil(r.date) <= 3 && getDaysUntil(r.date) >= 0);
  const weekReminders = allReminders.filter(r => {
    const days = getDaysUntil(r.date);
    return days > 3 && days <= 7;
  });

  const handleComplete = (id: string) => {
    updateManualReminder(id, { isDone: true });
  };

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-b border-slate-700/50 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold text-white">Dashboard</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="w-6 h-6 text-white" />
            </button>
          </div>
          <p className="text-slate-300">{dateStr}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {urgentReminders.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="text-xl font-bold text-white">
                Urgent ({urgentReminders.length})
              </h3>
            </div>
            <div className="space-y-3">
              {urgentReminders.map(reminder => (
                <ReminderCard
                  key={reminder.id}
                  reminder={reminder}
                  onDismiss={reminder.type === 'auto' ? dismissAutoReminder : undefined}
                  onComplete={reminder.type === 'manual' ? handleComplete : undefined}
                />
              ))}
            </div>
          </section>
        )}

        {weekReminders.length > 0 && (
          <section>
            <h3 className="text-xl font-bold text-white mb-4">
              This Week ({weekReminders.length})
            </h3>
            <div className="space-y-3">
              {weekReminders.map(reminder => (
                <ReminderCard
                  key={reminder.id}
                  reminder={reminder}
                  onDismiss={reminder.type === 'auto' ? dismissAutoReminder : undefined}
                  onComplete={reminder.type === 'manual' ? handleComplete : undefined}
                />
              ))}
            </div>
          </section>
        )}

        {allReminders.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-12 h-12 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No reminders yet</h3>
            <p className="text-slate-400 mb-6">Add your first reminder or interest to get started</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Add Reminder
            </button>
          </div>
        )}
      </div>

      {showAddModal && <AddReminderModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}
