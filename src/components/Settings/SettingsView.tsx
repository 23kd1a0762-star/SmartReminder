import { Moon, Sun, Globe, Clock, Mail, Bell } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export function SettingsView() {
  const { settings, updateSettings } = useData();

  if (!settings) return null;

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-b border-slate-700/50 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
          <p className="text-slate-300">Customize your experience</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        <section className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Sun className="w-5 h-5" />
            Appearance
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Theme</p>
                <p className="text-sm text-slate-400">Choose your preferred color scheme</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateSettings({ theme: 'dark' })}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    settings.theme === 'dark'
                      ? 'bg-purple-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => updateSettings({ theme: 'light' })}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    settings.theme === 'light'
                      ? 'bg-purple-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Language
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">App Language</p>
              <p className="text-sm text-slate-400">Select your preferred language</p>
            </div>
            <select
              value={settings.language}
              onChange={(e) => updateSettings({ language: e.target.value as 'en' | 'hi' })}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
        </section>

        <section className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-sm text-slate-400">Receive real-time alerts</p>
              </div>
              <button
                onClick={() => updateSettings({ pushEnabled: !settings.pushEnabled })}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.pushEnabled ? 'bg-purple-500' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.pushEnabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Email Digest</p>
                <p className="text-sm text-slate-400">Daily summary at 8 AM</p>
              </div>
              <button
                onClick={() => updateSettings({ emailDigest: !settings.emailDigest })}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.emailDigest ? 'bg-purple-500' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.emailDigest ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        <section className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Quiet Hours
          </h3>

          <div className="space-y-4">
            <p className="text-sm text-slate-400">
              No notifications will be sent during these hours
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={settings.quietHoursStart || '22:00'}
                  onChange={(e) => updateSettings({ quietHoursStart: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={settings.quietHoursEnd || '08:00'}
                  onChange={(e) => updateSettings({ quietHoursEnd: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">About</h3>
          <div className="space-y-2 text-sm text-slate-300">
            <p><strong>Version:</strong> 1.0.0</p>
            <p><strong>App:</strong> RemindAI - Smart Reminder System</p>
            <p className="text-slate-400">
              Never miss what matters to you. Automatically track exams, anime releases, sports matches, product launches, and more.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
