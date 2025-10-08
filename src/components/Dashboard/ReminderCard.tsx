import { Clock, ExternalLink, X, CheckCircle } from 'lucide-react';
import { AutoReminder, ManualReminder } from '../../types';
import { formatDate, formatTime, getRelativeTimeString, getCategoryColor, getCategoryIcon } from '../../utils/dateUtils';

interface ReminderCardProps {
  reminder: AutoReminder | ManualReminder;
  onDismiss?: (id: string) => void;
  onComplete?: (id: string) => void;
}

export function ReminderCard({ reminder, onDismiss, onComplete }: ReminderCardProps) {
  const isManual = 'isDone' in reminder;
  const isAuto = 'interestId' in reminder;

  const date = isManual ? (reminder as ManualReminder).reminderDate : (reminder as AutoReminder).eventDate;
  const time = isManual ? (reminder as ManualReminder).reminderTime : (reminder as AutoReminder).eventTime;
  const category = isAuto ? (reminder as AutoReminder).category : 'Personal';
  const sourceUrl = isAuto ? (reminder as AutoReminder).sourceUrl : undefined;

  const relativeTime = getRelativeTimeString(new Date(date));
  const isUrgent = relativeTime === 'Today' || relativeTime === 'Tomorrow';

  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border transition-all hover:scale-[1.02] ${
      isUrgent ? 'border-red-500/50 shadow-lg shadow-red-500/20' : 'border-slate-700/50'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 ${getCategoryColor(category)} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
          {getCategoryIcon(category)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg leading-tight mb-1">
                {reminder.title}
              </h3>
              {reminder.description && (
                <p className="text-slate-400 text-sm mb-2">{reminder.description}</p>
              )}
            </div>

            {onDismiss && (
              <button
                onClick={() => onDismiss(reminder.id)}
                className="p-1 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-medium ${
              isUrgent ? 'bg-red-500/20 text-red-300' : 'bg-slate-700/50 text-slate-300'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              {relativeTime}
            </div>

            <span className="text-slate-400 text-sm">
              {formatDate(new Date(date))}
              {time && ` • ${formatTime(time)}`}
            </span>

            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Source
              </a>
            )}
          </div>

          {isManual && onComplete && !(reminder as ManualReminder).isDone && (
            <button
              onClick={() => onComplete(reminder.id)}
              className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors text-sm font-medium"
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
