import { X } from 'lucide-react';
import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Category } from '../../types';
import { getCategoryIcon } from '../../utils/dateUtils';

interface AddInterestModalProps {
  onClose: () => void;
}

export function AddInterestModal({ onClose }: AddInterestModalProps) {
  const { addInterest } = useData();
  const [category, setCategory] = useState<Category>('Entertainment');
  const [name, setName] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');

  const categories: Category[] = ['Education', 'Entertainment', 'Sports', 'Tech', 'Career', 'Personal'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addInterest({
      category,
      name,
      sourceUrl: sourceUrl || undefined,
      isActive: true,
      notifyBefore: [30, 7, 1]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl max-w-md w-full p-6 border border-slate-700 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Add Interest</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Category *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    category === cat
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <div className="text-2xl mb-1">{getCategoryIcon(cat)}</div>
                  <div className="text-xs text-white font-medium">{cat}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Interest Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., One Piece, JEE Main 2025, IPL"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Source URL (Optional)
            </label>
            <input
              type="url"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="https://example.com"
            />
            <p className="text-xs text-slate-400 mt-1">
              Official website to scrape updates from
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
            <h4 className="text-sm font-medium text-white mb-2">How it works:</h4>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• We'll automatically track updates for this interest</li>
              <li>• You'll get notifications before important events</li>
              <li>• Updates are fetched daily from reliable sources</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Add Interest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
