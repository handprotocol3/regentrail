import React, { useState } from 'react';
import { toast } from 'sonner';
import { Quest } from '../types/game';
import { useGameStore } from '../store/gameStore';
import { EmojiBurst } from './EmojiBurst';
import { Milestone } from './Milestone';

interface QuestListProps {
  quests: Quest[];
}

export const QuestList: React.FC<QuestListProps> = ({ quests }) => {
  const addPoints = useGameStore((state) => state.addPoints);
  const [showBurst, setShowBurst] = useState(false);
  const [burstEmojis, setBurstEmojis] = useState<string[]>([]);
  const [currentMilestone, setCurrentMilestone] = useState<string | null>(null);

  const handleQuestComplete = async (quest: Quest) => {
    if (quest.completed) return;

    if (quest.milestones) {
      for (const milestone of quest.milestones) {
        setCurrentMilestone(milestone);
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      setCurrentMilestone(null);
    }

    addPoints(quest.points);
    setBurstEmojis(quest.rewards);
    setShowBurst(true);
    
    toast.success(`Quest Complete: ${quest.title}`, {
      description: `Earned: ${Object.entries(quest.points)
        .map(([key, value]) => `${value} ${key}`)
        .join(', ')}`,
    });
  };

  return (
    <div className="space-y-4">
      {currentMilestone && <Milestone text={currentMilestone} />}
      
      {quests.map((quest) => (
        <div
          key={quest.id}
          className={`quest-card bg-black/30 rounded-lg p-6 border border-emerald-500/20 backdrop-blur-sm transition-all duration-300 ${
            quest.completed ? 'opacity-50' : 'cursor-pointer hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/20'
          }`}
          onClick={() => !quest.completed && handleQuestComplete(quest)}
        >
          <h4 className="font-bold text-xl text-emerald-400 mb-3 quest-title">
            {quest.title}
          </h4>
          <p className="text-gray-200 text-base mb-3 leading-relaxed">
            {quest.description}
          </p>
          {quest.story && (
            <p className="text-emerald-300 italic mb-4 leading-relaxed">
              {quest.story}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {Object.entries(quest.points).map(([key, value]) => (
              <span
                key={key}
                className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-sm font-medium border border-emerald-500/20"
              >
                +{value} {key}
              </span>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            {quest.rewards.map((emoji, index) => (
              <span key={index} className="text-2xl filter drop-shadow-glow animate-float">
                {emoji}
              </span>
            ))}
          </div>
        </div>
      ))}
      {showBurst && (
        <EmojiBurst
          emojis={burstEmojis}
          onComplete={() => setShowBurst(false)}
        />
      )}
    </div>
  );
};