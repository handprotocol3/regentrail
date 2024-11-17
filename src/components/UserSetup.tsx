import React, { useState } from 'react';
import { Sprout, Leaf, TreePine } from 'lucide-react';

interface UserSetupProps {
  onComplete: (username: string | null) => void;
}

export const UserSetup: React.FC<UserSetupProps> = ({ onComplete }) => {
  const [username, setUsername] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedPath, setSelectedPath] = useState<'guardian' | 'innovator' | 'healer' | null>(null);

  const paths = [
    {
      id: 'guardian',
      name: 'Forest Guardian',
      description: 'Protect and nurture digital ecosystems',
      icon: TreePine,
      color: 'emerald'
    },
    {
      id: 'innovator',
      name: 'Eco Innovator',
      description: 'Pioneer regenerative technologies',
      icon: Sprout,
      color: 'purple'
    },
    {
      id: 'healer',
      name: 'Earth Healer',
      description: 'Restore balance to damaged systems',
      icon: Leaf,
      color: 'blue'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPath && (isAnonymous || username.trim())) {
      onComplete(isAnonymous ? null : username.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <Sprout size={48} className="text-emerald-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-emerald-400 mb-2">Choose Your Path</h1>
          <p className="text-gray-300">Every regenerator has their own way of healing the world</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {paths.map((path) => {
            const Icon = path.icon;
            return (
              <button
                key={path.id}
                onClick={() => setSelectedPath(path.id as any)}
                className={`p-6 rounded-xl border transition-all duration-300 text-left group ${
                  selectedPath === path.id
                    ? 'bg-emerald-500/20 border-emerald-500/50 ring-2 ring-emerald-500/20'
                    : 'bg-black/20 border-gray-700/30 hover:border-emerald-500/30'
                }`}
              >
                <Icon 
                  size={32} 
                  className={`mb-4 ${
                    selectedPath === path.id 
                      ? 'text-emerald-400 animate-bounce' 
                      : 'text-gray-400 group-hover:text-emerald-400'
                  }`}
                />
                <h3 className="font-bold text-lg text-emerald-400 mb-2">{path.name}</h3>
                <p className="text-sm text-gray-400">{path.description}</p>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-black/20 p-6 rounded-xl border border-emerald-500/20">
          <div className="space-y-4">
            <label className="block">
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isAnonymous}
                className="w-full px-4 py-2 rounded-lg bg-black/20 border border-emerald-500/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </label>

            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded border-emerald-500/20 text-emerald-500 focus:ring-emerald-500/50"
              />
              Stay anonymous
            </label>
          </div>

          <button
            type="submit"
            disabled={!selectedPath || (!isAnonymous && !username.trim())}
            className="w-full action-button py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Begin Your Journey
          </button>
        </form>
      </div>
    </div>
  );
};