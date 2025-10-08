import { Plus, Edit2, Trash2, Power, PowerOff } from 'lucide-react';
import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Category } from '../../types';
import { getCategoryColor, getCategoryIcon } from '../../utils/dateUtils';
import { AddInterestModal } from './AddInterestModal';

export function InterestsView() {
  const { interests, updateInterest, deleteInterest } = useData();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const categories: (Category | 'All')[] = ['All', 'Education', 'Entertainment', 'Sports', 'Tech', 'Career', 'Personal'];

  const filteredInterests = selectedCategory === 'All'
    ? interests
    : interests.filter(i => i.category === selectedCategory);

  const toggleActive = (id: string, isActive: boolean) => {
    updateInterest(id, { isActive: !isActive });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this interest? All associated reminders will be removed.')) {
      deleteInterest(id);
    }
  };

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-b border-slate-700/50 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold text-white">Interests</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="w-6 h-6 text-white" />
            </button>
          </div>
          <p className="text-slate-300">Manage what you want to track</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              {category === 'All' ? 'All' : `${getCategoryIcon(category)} ${category}`}
            </button>
          ))}
        </div>

        {filteredInterests.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredInterests.map(interest => (
              <div
                key={interest.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 hover:border-slate-600 transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-12 h-12 ${getCategoryColor(interest.category)} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                    {getCategoryIcon(interest.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-lg leading-tight mb-1">
                      {interest.name}
                    </h3>
                    <p className="text-slate-400 text-sm">{interest.category}</p>
                  </div>
                </div>

                {interest.sourceUrl && (
                  <a
                    href={interest.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 text-sm block mb-3 truncate"
                  >
                    {interest.sourceUrl}
                  </a>
                )}

                <div className="flex items-center gap-2 pt-3 border-t border-slate-700">
                  <button
                    onClick={() => toggleActive(interest.id, interest.isActive)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${
                      interest.isActive
                        ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                        : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {interest.isActive ? (
                      <>
                        <Power className="w-4 h-4" />
                        Active
                      </>
                    ) : (
                      <>
                        <PowerOff className="w-4 h-4" />
                        Paused
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(interest.id)}
                    className="p-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-12 h-12 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No interests yet</h3>
            <p className="text-slate-400 mb-6">
              Add interests to automatically track updates
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Add Interest
            </button>
          </div>
        )}
      </div>

      {showAddModal && <AddInterestModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}
